from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.fields import set_value
from rest_framework.response import Response

from importlib import import_module

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate, login

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from . import models
from contacts.models import ContactGroup
from KLTN import settings
from .utils import send_email_register

import re
import django_rq


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ['last_login', 'date_joined',
                   'groups', 'user_permissions', 'password']


class ProfileWithUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.Profile
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Profile
        exclude = ['user']

    def validate_phone(self, value):
        is_valid_phone_num = re.compile('^\d{10}$')
        if not is_valid_phone_num.match(value):
            raise serializers.ValidationError(
                'Số điện thoại phải có 10 số (ví dụ: 0123456789)')
        return value



class MeSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(read_only=True)
    sale_reps = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ['last_login', 'date_joined',
                   'groups', 'user_permissions', 'password']

    def get_sale_reps(self, obj):
        profiles = models.Profile.objects.filter(is_manager=False)

        return ProfileWithUserSerializer(profiles, many=True).data


class LoginAndUpdateSerializer(serializers.ModelSerializer, TokenObtainPairSerializer):

    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        exclude = ['last_login', 'date_joined',
                   'groups', 'user_permissions']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        username = validated_data.get("username")
        password = validated_data.get("password")
        self.user = authenticate(username=username, password=password)
        if self.user is None:
            raise ValidationError(
                detail={'all': 'Sai username, mật khẩu hoặc tài khoản của bạn chưa xác nhận email'})
        return self.user

    def update(self, instance, validated_data):
        self.user = super().update(instance, validated_data)
        return self.user

    def to_internal_value(self, data):
        ret = super().to_internal_value(data)
        if 'oldPassword' in data:
            username = ret["username"]
            old_password = ret["old_password"]
            self.user = authenticate(username=username, password=old_password)
            if self.user is None:
                raise ValidationError(
                    detail={'msg': 'Wrong password'})
        return ret

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        refresh = self.get_token(self.user)
        set_value(ret, ['refresh'], str(refresh))
        set_value(ret, ['access'], str(refresh.access_token))
        return ret

    def validate(self, attrs):
        return attrs


class RegisterSerializer(serializers.ModelSerializer, TokenObtainPairSerializer):
    username = serializers.CharField(write_only=True)
    profile = ProfileSerializer()

    class Meta:
        model = User
        exclude = ['last_login', 'date_joined',
                   'groups', 'user_permissions']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        profile = validated_data.pop('profile')
        # User = get_user_model()
        try:
            self.user = User.objects.get(username=validated_data['username'])
            if self.user is not None:
                raise ValidationError(
                    detail={'message': 'Username already existed'})
        except User.DoesNotExist:
            self.user = User.objects.create_user(**validated_data)
            self.user.is_active = False
            self.user.save()
            queue = django_rq.get_queue('default', is_async=True)
            queue.enqueue(send_email_register, self.user)
            new_profile = models.Profile(
                user=self.user, is_manager=profile['is_manager'], phone=profile['phone'], company_name=profile['company_name'], manager=profile['manager'])
            new_profile.save()
            default_group = ContactGroup.objects.create(
                user=self.user, name='All Contacts', _type=''
            )
            self.user.profile = new_profile

            return self.user

    def validate(self, attrs):
        return attrs

from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.fields import set_value

from importlib import import_module

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate, login
from django.core.mail import send_mail
from django.template.loader import render_to_string

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from . import models
from KLTN import settings

import re


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

    class Meta:
        model = User
        exclude = ['last_login', 'date_joined',
                   'groups', 'user_permissions', 'password']


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
                detail={'all': 'Sai username hoặc mật khẩu'})
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
        self.user = User.objects.create_user(**validated_data)
        self.user.is_active = False
        mail_subject = 'Activate your AQV Management System account.'
        message = 'Please click this link below to activate your account'
        send_mail(mail_subject, message,settings.EMAIL_HOST_USER,[self.user.email])
        new_profile = models.Profile(
            user=self.user, is_manager=profile['is_manager'], phone=profile['phone'], company_name=profile['company_name'], manager=profile['manager'])
        new_profile.save()
        self.user.profile = new_profile
        return self.user

    def validate(self, attrs):
        return attrs

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        refresh = self.get_token(self.user)
        set_value(ret, ['username'], instance.username)
        set_value(ret, ['refresh'], str(refresh))
        set_value(ret, ['access'], str(refresh.access_token))
        return ret

from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.fields import set_value
from rest_framework.validators import ValidationError, UniqueTogetherValidator

from . import models
from account.serializers import MeSerializer
from campaigns.serializers import NoteSerializer
import re


class ContactWithoutGroupSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    class Meta:
        model = models.Contact
        # exclude = ['groups']
        fields = '__all__'

    def validate_phone(self, value):
        is_valid_phone_num = re.compile('^\d{10}$')
        if not is_valid_phone_num.match(value):
            raise serializers.ValidationError(
                'Invalid phone number, it must be 10 digits in length (Ex: 0123456789)')
        return value


class GroupSerializer(serializers.ModelSerializer):
    contacts = ContactWithoutGroupSerializer(many=True)
    total_contact = serializers.SerializerMethodField()
    editor = MeSerializer()
    creator = serializers.SerializerMethodField()

    class Meta:
        model = models.ContactGroup
        # fields = '__all__'
        exclude = ['user']

    def get_total_contact(self, instance):

        return instance.contacts.count()

    def get_creator(self, instance):

        return MeSerializer(instance.user).data


class GroupWithoutContactSerializer(serializers.ModelSerializer):

    total_contact = serializers.SerializerMethodField()
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    notes = NoteSerializer(many=True, read_only=True)
    # editor = MeSerializer()
    # contacts = serializers.PrimaryKeyRelatedField(
    #     many=True, read_only=True)

    class Meta:
        model = models.ContactGroup
        fields = "__all__"

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def get_total_contact(self, instance):

        return instance.contacts.count()


class ContactReadSerializer(serializers.ModelSerializer):
    groups = GroupWithoutContactSerializer(many=True)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = models.Contact
        fields = '__all__'

    def get_full_name(self, instance):

        return f'{instance.first_name} {instance.last_name}'


class ContactSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.Contact
        fields = '__all__'

    def to_internal_value(self, data):
        ret = super().to_internal_value(data)
        if 'groups' in data:
            set_value(ret, ['groups'], data['groups'])
        return ret

    def create(self, validated_data):
        groups = validated_data.pop('groups', None)
        if not groups or len(groups) == 0:
            raise ValidationError(
                detail={"msg": '"All Contacts" must be included'})
        instance = super().create(validated_data)
        instance.groups.set(groups)
        return instance

    def update(self, instance, validated_data):
        groups = validated_data.pop('groups')
        if not groups or len(groups) == 0:
            raise ValidationError(
                detail={"msg": '"All Contacts" must be included'})
        instace = super().update(instance, validated_data)
        instance.groups.set(groups)
        return instance

    def validate_phone(self, value):
        is_valid_phone_num = re.compile('^\d{10}$')
        if not is_valid_phone_num.match(value):
            raise serializers.ValidationError(
                'Invalid phone number, it must be 10 digits in length (Ex: 0123456789)')
        return value

    def validate_zipcode(self, value):

        is_valid_zipcode = re.compile('^\d{5}$')
        if not is_valid_zipcode.match(str(value)) and value != '':
            raise serializers.ValidationError(
                'Zipcode must be 5 digits in length')
        return value

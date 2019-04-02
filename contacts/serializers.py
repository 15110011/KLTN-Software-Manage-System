from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.fields import set_value
from rest_framework.validators import ValidationError, UniqueTogetherValidator

from . import models
from account.serializers import MeSerializer


class ContactWithoutGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Contact
        # exclude = ['groups']
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    contacts = ContactWithoutGroupSerializer(many=True)
    # user = MeSerializer()

    class Meta:
        model = models.ContactGroup
        # fields = '__all__'
        exclude = ['user']


class GroupWithoutContactSerializer(serializers.ModelSerializer):

    total_contact = serializers.SerializerMethodField()
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # contacts = serializers.PrimaryKeyRelatedField(
    #     many=True, read_only=True)

    class Meta:
        model = models.ContactGroup
        fields = "__all__"

    def update(self, instance, validated_data):
        print(validated_data)
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
        validators = [
            UniqueTogetherValidator(
                queryset=models.Contact.objects.all(),
                fields=('first_name', 'last_name', 'user'),
                message='This contact is existed'
            )
        ]

    def to_internal_value(self, data):
        ret = super().to_internal_value(data)
        if 'groups' in data:
            set_value(ret, ['groups'], data['groups'])
        return ret

    def create(self, validated_data):
        groups = validated_data.pop('groups')
        if not groups or len(groups) == 0:
            raise ValidationError(
                detail={"msg": '"All Contacts" must be included'})
        instance = super().create(validated_data)
        instance.groups.set(groups)
        return instance


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Note
        fields = '__all__'

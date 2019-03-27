from django.contrib.auth import get_user_model

from rest_framework import serializers

from . import models
from account.serializers import MeSerializer


class ContactWithoutGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Contact
        exclude = ['groups']


class GroupSerializer(serializers.ModelSerializer):
    contacts = ContactWithoutGroupSerializer(many=True)
    # user = MeSerializer()

    class Meta:
        model = models.ContactGroup
        # fields = '__all__'
        exclude = ['user']


class GroupWithoutContactSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # contacts = serializers.PrimaryKeyRelatedField(
    #     many=True, read_only=True)

    class Meta:
        model = models.ContactGroup
        fields = "__all__"

    def update(self, instance, validated_data):
        print(validated_data)
        return super().update(instance, validated_data)


class ContactReadSerializer(serializers.ModelSerializer):
    groups = GroupWithoutContactSerializer(many=True)

    class Meta:
        model = models.Contact
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Contact
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Note
        fields = '__all__'
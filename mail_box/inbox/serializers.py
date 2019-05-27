from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from rest_framework import serializers
from . import models


class MailBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MailBox
        fields = '__all__'

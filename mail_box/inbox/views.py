from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from . import serializers
from . import models
# Create your views here.


# class MailBoxViewSet(ModelViewSet):
#     serializer_class = serializers.MailBoxSerializer
#     queryset = models.MailBox.objects

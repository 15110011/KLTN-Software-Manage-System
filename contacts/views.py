from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from . import serializers
from . import models

# Create your views here.

class ContactView(ModelViewSet):

    queryset = models.Contact.objects
    serializer_class = serializers.ContactSerializer
    
    def list(self, request, *args, **kwargs):
        queryset=self.get_queryset()
        serializer = serializers.ContactReadSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        
        serializer = serializers.ContactReadSerializer(self.get_object())
        return Response(serializer.data, status=status.HTTP_200_OK)

class ContactGroupView(ModelViewSet):

    queryset = models.ContactGroup.objects
    serializer_class = serializers.GroupSerializer

    def create(self, request, *args, **kwargs):
        serializer = serializers.GroupWithoutContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.GroupWithoutContactSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
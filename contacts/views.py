from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse
from django.forms.models import model_to_dict
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from elasticsearch_dsl.query import MultiMatch
from elasticsearch_dsl import Q
from . import serializers
from . import models
from . import documents

# Create your views here.


class ContactView(ModelViewSet):

    queryset = models.Contact.objects
    serializer_class = serializers.ContactSerializer
    permission_class = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = serializers.ContactReadSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):

        serializer = serializers.ContactReadSerializer(self.get_object())
        return Response(serializer.data, status=status.HTTP_200_OK)


class ContactGroupView(ModelViewSet):

    queryset = models.ContactGroup.objects
    serializer_class = serializers.GroupSerializer

    def list(self, request, *args, **kwargs):
        filters = Q(user=request.user)
        if 'groups' in request.query_params:
            filters.add(Q(groups__name=request.query_params['groups']))
        queryset = self.get_queryset().filter(filters)
        serializer = serializers.GroupWithoutContactSerializer(
            queryset, many=True, context={'request': request})
        new_serializer = {
            "data": serializer.data,
            "total": self.get_queryset().filter(user=request.user).count()
        }
        return Response(new_serializer, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = serializers.GroupWithoutContactSerializer(
            data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.GroupWithoutContactSerializer(
            instance, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'])
    def contacts(self, request, pk=None):
        instance = self.get_object()
        query = request.query_params.get('q', None)
        if query is not None:
            search = documents.ContactDocument.search()
            match = MultiMatch(query=query, fields=[
                               'full_name'], type='best_fields')
            search = search.query(match)
            suggest = search.suggest('auto_complete', query, completion={
                                     'field': 'full_name.suggest'})
            response = suggest.execute()
            suggestion = [option._source.full_name for option in response.suggest.auto_complete[0].options]
            contacts = [model_to_dict(contact)
                        for contact in search.to_queryset()]
            return Response({"contacts": contacts, "suggestions": suggestion})
        queryset = models.Contact.objects.filter(groups__id=instance.id)

        serializer = serializers.ContactWithoutGroupSerializer(
            queryset, many=True)

        contacts = {
            "data": serializer.data,
            "total": queryset.count()
        }
        return Response(contacts, status=status.HTTP_200_OK)

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
# from elasticsearch_dsl import Q
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

    queryset = models.ContactGroup.objects.prefetch_related('contacts')
    serializer_class = serializers.GroupSerializer

    def list(self, request, *args, **kwargs):
        filters = Q()
        filters.add(Q(user=request.user), Q.AND)

        isFindGroupDefault = False
        if 'group' in request.query_params:
            filters.add(Q(name=request.query_params['group']), Q.AND)
            if request.query_params['group'] == 'All Contacts':
                isFindGroupDefault = True
        queryset = self.get_queryset().filter(filters)
        if isFindGroupDefault:
            serializer = serializers.GroupSerializer(
                queryset, context={'request': request}, many=True)

            new_serializer = serializer.data[0]

        else:
            serializer = serializers.GroupWithoutContactSerializer(
                queryset.order_by('id'), many=True, context={'request': request})
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

        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except:
            return Response({"name": 'This name is existed'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.GroupWithoutContactSerializer(
            instance, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()        

        if instance.name == 'All Contacts':
            return Response({"msg":"Cannot delete default group"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            instance.delete()
        return Response({"msg":"DEL OK"}, status=status.HTTP_200_OK)

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
            "total": queryset.count(),
            "group": instance.name
        }
        return Response(contacts, status=status.HTTP_200_OK)

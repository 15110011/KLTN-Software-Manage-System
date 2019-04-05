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
        return Response({"msg": 'WHAT ARE U LOOKING FOR???'}, status=status.HTTP_200_OK)
        # queryset = self.get_queryset()
        # serializer = serializers.ContactReadSerializer(queryset, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        # return Response({"msg": 'WHAT ARE U LOOKING FOR???'}, status=status.HTTP_200_OK)
        serializer = serializers.ContactReadSerializer(self.get_object())
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @action(detail=False, methods=['DELETE'])
    def batchdelete(self, request):
        is_default_group = request.data.get('isDefaultGroup', None)
        contacts = models.Contact.objects.filter(
            id__in=request.data['contacts'])
        if is_default_group:
            groups = models.ContactGroup.objects.filter(
                contacts__in=request.data['contacts'])
            for g in groups:
                g.contacts.remove(*contacts)
        else:
            models.ContactGroup.objects.get(
                id=request.data['group']).contacts.remove(*contacts)

        return Response({"msg": 'OK'}, status=status.HTTP_200_OK)


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
            serializer = serializers.GroupSerializer(
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

        # try:
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # except:
        #     return Response({"name": 'This name is existed'}, status=status.HTTP_400_BAD_REQUEST)
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
            return Response({"msg": "Cannot delete default group"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            instance.delete()
        return Response({"msg": "DEL OK"}, status=status.HTTP_200_OK)

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
            suggestion = [
                option._source.full_name for option in response.suggest.auto_complete[0].options]
            contacts = [model_to_dict(contact)
                        for contact in search.to_queryset()]
            return Response({"contacts": contacts, "suggestions": suggestion})
        page = request.query_params.get(
            'page') if int(request.query_params.get('page', 0)) > 0 else 0

        limit = None
        if 'limit' in self.request.query_params:
            limit = self.request.query_params.get('limit')

        filters = Q(groups__id=instance.id)

        f_first_name = request.query_params.get('first_name', None)
        f_last_name = request.query_params.get('last_name', None)
        f_phone = request.query_params.get('phone', None)
        f_mail = request.query_params.get('mail', None)
        if f_first_name:
            filters.add(Q(first_name__icontains=f_first_name), Q.AND)
        if f_last_name:
            filters.add(Q(last_name__icontains=f_last_name), Q.AND)
        if f_phone:
            filters.add(Q(phone__icontains=f_phone), Q.AND)
        if f_mail:
            filters.add(Q(mail__icontains=f_mail), Q.AND)
        if limit:
            queryset = models.Contact.objects.filter(filters).order_by(
                'first_name')[int(page)*int(limit):int(page)*int(limit)+int(limit)]
        else:
            queryset = models.Contact.objects.filter(
                filters).order_by('first_name')

        serializer = serializers.ContactWithoutGroupSerializer(
            queryset, many=True)
        contacts = {
            "data": serializer.data,
            "total": models.Contact.objects.filter(filters).count(),
            "page": page,
            "group": instance.name
        }
        return Response(contacts, status=status.HTTP_200_OK)

    @action(detail=False, methods=['PATCH'])
    def addcontacts(self, request):

        for g in request.data.get('groups', []):
            cur_g = models.ContactGroup.objects.get(id=g)
            cur_cs = models.Contact.objects.filter(
                id__in=request.data['contacts'])
            cur_g.contacts.add(*cur_cs)
        return Response({"msg": 'COMPLETE'}, status=status.HTTP_200_OK)

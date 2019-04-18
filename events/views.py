from django.shortcuts import render
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status

import datetime

from . import models
from . import serializers
from campaigns.models import ContactMarketingHistory
from campaigns.serializers import ContactMarketingHistorySerializer


now = datetime.datetime.now()

# Create your views here.


class EventView(ModelViewSet):
    queryset = models.Event.objects
    serializer_class = serializers.EventSerializer

    def list(self, request, *args, **kwargs):
        filters = Q()
        excludes = Q()

        queryset = self.get_queryset()
        filters.add(Q(assigned_to=request.user), Q.AND)
        # upcomping or calender list render
        list_type = request.query_params.get('list_type', 'upcoming')
        remaining_order = request.query_params.get('remainingOrder', None)
        priority_order = request.query_params.get('priorityOrder', None)
        if list_type == 'upcoming':
            # Filter
            remaining = request.query_params.get('remaining', None)
            priority = request.query_params.get('priority', None)
            # order
            if remaining_order:
                remaining_order = '-end_date' if remaining_order == 'desc' else 'end_date'
            if priority_order:
                priority_order = '-priority' if priority_order == 'desc' else 'priority'

            filters.add(Q(end_date__gte=now), Q.AND)
            if remaining:
                filters.add(Q(end_date=datetime.timedelta(
                    days=int(remaining))+now), Q.AND)
            if priority:
                priorities = [int(p) for p in priority.split(',')]
                filters.add(Q(priority__in=priorities), Q.AND)
        elif list_type == 'marketing':
            filters.add(Q(end_date__gte=now), Q.AND)
            filters.add(Q(order=None), Q.AND)
            excludes.add(Q(marketing=None), Q.AND)
        elif list_type == 'followup':
            filters.add(Q(end_date__gte=now), Q.AND)
            filters.add(Q(marketing=None), Q.AND)
            excludes.add(Q(order=None), Q.AND)
        # pagin
        page = request.query_params.get(
            'page') if int(request.query_params.get('page', 0)) > 0 else 0

        limit = None
        if 'limit' in self.request.query_params:
            limit = self.request.query_params.get('limit')

        if limit:
            filters.add(Q(marketing__status='RUNNING') |
                        Q(order__status='RUNNING'), Q.AND)
            # queryset = queryset.exclude(excludes).filter(filters)
            if list_type == 'marketing' or list_type == 'followup':
                queryset = queryset.exclude(excludes).filter(filters).order_by('modified', 'end_date', '-priority')[
                    int(page)*int(limit):int(page)*int(limit)+int(limit)]
            elif remaining_order == None and priority_order == None:
                queryset = queryset.exclude(excludes).filter(filters).order_by('end_date', '-priority')[
                    int(page)*int(limit):int(page)*int(limit)+int(limit)]

            elif remaining_order != None:
                queryset = queryset.exclude(excludes).filter(filters).order_by(remaining_order, '-priority')[
                    int(page)*int(limit):int(page)*int(limit)+int(limit)]
            elif priority_order != None:
                queryset = queryset.exclude(excludes).filter(filters).order_by(priority_order, 'end_date')[
                    int(page)*int(limit):int(page)*int(limit)+int(limit)]

            serializer = serializers.EventReadSerializer(queryset, many=True)

        else:
            serializer = serializers.EventReadSerializer(queryset.filter(
                filters).order_by('priority'), many=True)

        new_data = {
            "data": serializer.data,
            "total": len(serializer.data)
        }

        return Response(new_data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.EventReadSerializer(
            instance, data=request.data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    @action(methods=['POST'], detail=True)
    def marketing(self, request, pk=None):
        instance = self.get_object()
        # instance.modified = datetime.datetime.now
        instance.save()
        history = ContactMarketingHistory.objects.create(
            action=request.data['action'], contact_marketing=instance.marketing)
        serializer = ContactMarketingHistorySerializer(history)
        return Response(serializer.data, status=status.HTTP_200_OK)

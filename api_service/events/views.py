from django.shortcuts import render
from django.db.models import Q
from django.db import models as DjangoModel
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status

import datetime

from . import models
from . import serializers
from campaigns.models import ContactMarketingHistory
from campaigns.serializers import ContactMarketingHistorySerializer




# Create your views here.


class EventView(ModelViewSet):
    queryset = models.Event.objects
    serializer_class = serializers.EventSerializer

    def list(self, request, *args, **kwargs):
        filters = Q()
        excludes = Q()
        now = datetime.datetime.now()


        queryset = self.get_queryset()
        filters.add(Q(assigned_to=request.user), Q.AND)
        # upcomping or calender list render
        view_type = request.query_params.get('view_type', 'campaign')
        list_type = request.query_params.get('list_type', 'upcoming')
        remaining_order = request.query_params.get('remainingOrder', None)
        priority_order = request.query_params.get('priorityOrder', None)
        target_order = request.query_params.get('targetOrder', None)
        campaign_order = request.query_params.get('campaignOrder', None)
        phase_order = request.query_params.get('phaseOrder', None)
        start_order = request.query_params.get('startOrder', None)
        # Filter
        remaining = request.query_params.get('remaining', None)
        priority = request.query_params.get('priority', None)
        target = request.query_params.get('target', None)
        campaign = request.query_params.get('campaign', None)
        phase = request.query_params.get('phase', None)
        phase_id = request.query_params.get('phaseId', None)
        start_from = request.query_params.get('start_from', None)
        start_to = request.query_params.get('start_to', None)
        # order
        if remaining_order:
            remaining_order = '-end_date' if remaining_order == 'desc' else 'end_date'
        if priority_order:
            priority_order = '-priority' if priority_order == 'desc' else 'priority'
        if campaign_order:
            campaign_order = '-priority' if priority_order == 'desc' else 'priority'
        if start_order:
            start_order = '-start_date' if start_order == 'desc' else 'start_date'
        if view_type == 'campaign':
            # filters.add(Q(marketing__campaign__end_date__gte=now) & Q(marketing__campaign__start_date__lte=now), Q.AND)
            filters.add(Q(marketing__campaign__end_date__gte=now)| Q(order__campaign__end_date__gte=now), Q.AND)
            filters.add(Q(~Q(marketing=None) & Q(marketing__status='RUNNING')) |
                        Q(~Q(order=None) & Q(order__status='RUNNING')), Q.AND)
        elif view_type == 'personal':
            filters.add(Q(marketing=None), Q.AND)
            filters.add(Q(order=None), Q.AND)
        filters.add(Q(end_date__gte=now) & Q(start_date__lte=now), Q.AND)
        #filters.add(Q(end_date__date__gte=now), Q.AND)
        if remaining:
            filters.add(Q(end_date=datetime.timedelta(
                days=int(remaining))+now), Q.AND)
        if priority:
            priorities = [int(p) for p in priority.split(',')]
            filters.add(Q(priority__in=priorities), Q.AND)
        if target:
            filters.add(Q(contacts__first_name__icontains=target) |
                        Q(contacts__last_name__icontains=target), Q.AND)
        if campaign:
            filters.add(
                Q(marketing__campaign__name__icontains=campaign), Q.AND)

        if phase:
            phases = [p for p in phase.split(',')]
            phase_filter = Q()
            if 'Ticket' in phase:
                phase_filter.add(Q(marketing__status='RUNNING'), Q.OR)
            if 'Follow-up' in phase:
                phase_filter.add(Q(marketing=None)
                                 & Q(order__status='RUNNING'), Q.OR)
            if 'Order' in phase:
                phase_filter.add(Q(order__status='COMPLETED'), Q.OR)
            filters.add(phase_filter, Q.AND)
        if phase_id and ('O' in phase_id or 'T' in phase_id or 'F' in phase_id):
            phase_type = phase_id[0]
            look_id = phase_id[1:]
            if look_id:
                if phase_type == 'O':
                    filters.add(Q(order__status='COMPLETED'), Q.AND)
                    filters.add(Q(order__id=int(look_id)), Q.AND)
                elif phase_type == 'F':
                    filters.add(Q(marketing__status='COMPLETED')
                                & Q(order__status='RUNNING') & Q(order__id=int(look_id)), Q.AND)
                elif phase_type == 'T':
                    filters.add(Q(marketing__status='RUNNING') &
                                Q(marketing__id=int(look_id)), Q.AND)
            else:
                if phase_type == 'O':
                    filters.add(Q(order__status='COMPLETED'), Q.AND)
                elif phase_type == 'F':
                    filters.add(Q(marketing__status='COMPLETED')
                                & Q(order__status='RUNNING'), Q.AND)
                elif phase_type == 'T':
                    filters.add(Q(marketing__status='RUNNING'), Q.AND)
        if start_from:
            filters.add(Q(start_date__date__gte=start_from), Q.AND)
        if start_to:
            filters.add(Q(start_date__date__lte=start_to), Q.AND)
        # paging
        page = request.query_params.get(
            'page') if int(request.query_params.get('page', 0)) > 0 else 0

        limit = None
        if 'limit' in self.request.query_params:
            limit = self.request.query_params.get('limit')

        if limit:
            # queryset = queryset.exclude(excludes).filter(filters)
            if remaining_order:
                queryset = queryset.exclude(excludes).filter(filters).order_by(remaining_order, '-priority')[
                    int(page)*int(limit):int(page)*int(limit)+int(limit)]
            elif priority_order:
                queryset = queryset.exclude(excludes).filter(filters).order_by(priority_order, 'end_date')[
                    int(page)*int(limit):int(page)*int(limit)+int(limit)]
            elif phase_order:
                if phase_order == 'asc':
                    queryset = queryset.exclude(excludes).filter(filters).annotate(
                        phase=DjangoModel.Case(
                            DjangoModel.When(
                                marketing__status='RUNNING', then=DjangoModel.Value(0)),
                            DjangoModel.When(marketing__status='COMPLETED',
                                             order__status='RUNNING', then=DjangoModel.Value(1)),
                            DjangoModel.When(
                                marketing__status='COMPLETED', order__status='COMPLETED', then=DjangoModel.Value(2)),
                            output_field=DjangoModel.IntegerField()
                        )
                    ).order_by('phase')[int(page)*int(limit):int(page)*int(limit)+int(limit)]
                elif phase_order == 'desc':
                    queryset = queryset.exclude(excludes).filter(filters).annotate(
                        phase=DjangoModel.Case(
                            DjangoModel.When(
                                marketing__status='RUNNING', then=DjangoModel.Value(0)),
                            DjangoModel.When(marketing__status='COMPLETED',
                                             order__status='RUNNING', then=DjangoModel.Value(1)),
                            DjangoModel.When(
                                marketing__status='COMPLETED', order__status='COMPLETED', then=DjangoModel.Value(2)),
                            output_field=DjangoModel.IntegerField()
                        )
                    ).order_by('-phase')[int(page)*int(limit):int(page)*int(limit)+int(limit)]
            elif target_order:
                if target_order == 'asc':
                    queryset = queryset.exclude(excludes).filter(filters).order_by('contacts__first_name', 'contacts__last_name', 'end_date')[
                        int(page)*int(limit):int(page)*int(limit)+int(limit)]
                elif target_order == 'desc':
                    queryset = queryset.exclude(excludes).filter(filters).order_by('-contacts__first_name', '-contacts__last_name', 'end_date')[
                        int(page)*int(limit):int(page)*int(limit)+int(limit)]
            elif start_order:
                queryset = queryset.exclude(excludes).filter(filters).order_by(start_order, 'end_date')[
                    int(page)*int(limit):int(page)*int(limit)+int(limit)]
            else:
                queryset = queryset.exclude(excludes).filter(filters).order_by('end_date', '-priority')[
                    int(page)*int(limit):int(page)*int(limit)+int(limit)]
            serializer = serializers.EventReadSerializer(queryset, many=True)
        else:
            serializer = serializers.EventReadSerializer(queryset.filter(
                filters).order_by('priority'), many=True)

        set_id = set()
        final_data = []
        for event in serializer.data:

            if event['id'] not in set_id:
                if target:
                    event['contacts'] = [c for c in event['contacts']
                                         if target.upper() in c['first_name'].upper() or c['last_name'].upper() in target.upper()]
                final_data.append(event)
                set_id.add(event['id'])
        print(queryset.query)
        new_data = {
            "data": final_data,
            "total": self.get_queryset().exclude(excludes).filter(filters).values('contacts__first_name').count()
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

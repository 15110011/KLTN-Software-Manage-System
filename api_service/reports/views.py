from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from . import models
from . import serializers
from rest_framework.decorators import api_view, permission_classes, action
from campaigns.models import Campaign
from orders.models import Order
from orders.serializers import ReportOrderSerializer
from django.db.models import Q, Count, CharField, Value as V
from datetime import datetime, timedelta, timezone
import calendar
from django.forms.models import model_to_dict


# Create your views here.


class ReportView(ModelViewSet):
    queryset = models.Report.objects
    serializer_class = serializers.ReportSerializer


@api_view(['POST'])
# @permission_classes((IsAuthenticated, ))
def Reports(request):
    data = request.data.get('data', None)
    states = data.get('states', None)
    from_date = data.get('from', None)
    to_date = data.get('to', None)
    user = request.user
    result = None
    if from_date is None and to_date is None:
        result = filter_state(states)
    if states is None:
        result = filter_time(from_date, to_date)
    if states and from_date and to_date:
        result = filter_state_datetime(states, from_date, to_date)

    return Response({"data": result})

def filter_state_datetime(states, from_date, to_date):
    filters = Q()
    filters.add(Q(created__gte=from_date) & Q(created__lte=to_date), Q.AND)
    filters.add(Q(status='RUNNING') | Q(status='COMPLETED'), Q.AND)
    orders = Order.objects.filter(filters)
    data = []
    for order in orders:
        conditions = order.campaign.marketing_plan.condition['must']
        is_all = True
        for condition in conditions:
            if condition['operand'] == '1':
                if condition['operator'] == 'Equal to':
                    if set(condition['data']).intersection(set(states)):
                        result = ReportOrderSerializer(order).data
                        data.append(result)
                elif condition['operator'] == 'Not equal to':
                    if not set(condition['data']).intersection(set(states)):
                        result = ReportOrderSerializer(order).data
                        data.append(result)
                is_all = False
        if is_all:
            result = ReportOrderSerializer(order).data
            data.append(result)
    return data

def filter_state(states):
    orders = Order.objects.filter(Q(status='RUNNING') | Q(status='COMPLETED'))
    data = []
    for order in orders:
        conditions = order.campaign.marketing_plan.condition['must']
        is_all = True
        for condition in conditions:
            if condition['operand'] == '1':
                if condition['operator'] == 'Equal to':
                    if set(condition['data']).intersection(set(states)):
                        result = ReportOrderSerializer(order).data
                        data.append(result)
                elif condition['operator'] == 'Not equal to':
                    if not set(condition['data']).intersection(set(states)):
                        result = ReportOrderSerializer(order).data
                        data.append(result)
                is_all = False
        if is_all:
            result = ReportOrderSerializer(order).data
            data.append(result)
    return data


def filter_time(from_date, to_date):
    filters = Q()
    filters.add(Q(created__gte=from_date) & Q(created__lte=to_date), Q.AND)
    filters.add(Q(status='RUNNING') | Q(status='COMPLETED'), Q.AND)
    orders = Order.objects.filter(filters)
    orders = [ReportOrderSerializer(order).data for order in orders]
    return orders

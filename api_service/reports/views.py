from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from . import models
from . import serializers
from rest_framework.decorators import api_view, permission_classes, action
from campaigns.models import Campaign
from campaigns.serializers import ReportCampaignSerializer
from django.db.models import Q, Count, CharField, Value as V
from datetime import datetime, timedelta
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
    filters = Q()
    result = None
    if from_date is None and to_date is None:
        result = filter_state(states)
        

    return Response({"data": result})


def filter_state(states):
    campaigns = Campaign.objects.filter(end_date__gte=datetime.now())
    data = []
    for campaign in campaigns:
        conditions = campaign.marketing_plan.condition['must']
        is_all=True
        for condition in conditions:
            if condition['operand'] == '1':
                if condition['operator'] == 'Equal to':
                    if set(condition['data']).intersection(set(states)):
                        result = ReportCampaignSerializer(campaign).data
                        data.append(result)
                elif condition['operator'] == 'Not equal to':
                    if not set(condition['data']).intersection(set(states)):
                        result = ReportCampaignSerializer(campaign).data
                        data.append(result)
                is_all=False
        if is_all:
            result = ReportCampaignSerializer(campaign).data
            data.append(result)
    return data

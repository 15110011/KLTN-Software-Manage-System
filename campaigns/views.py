from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import MarketingPlan, FollowUpPlan, Campaign
from .serializers import MarketingPlanSerialier, FollowUpPlanSerializer, CampaignSerializer
from rest_framework import status
# Create your views here.


class MarketingPlanView(ModelViewSet):
    queryset = MarketingPlan.objects
    serializer_class = MarketingPlanSerialier


class FollowUpPlanView(ModelViewSet):
    queryset = FollowUpPlan.objects
    serializer_class = FollowUpPlanSerializer


class CampaignView(ModelViewSet):
    queryset = Campaign.objects
    serializer_class = CampaignSerializer

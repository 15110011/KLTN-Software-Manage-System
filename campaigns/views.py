from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import MarketingPlan, FollowUpPlan, Campaign
from .serializers import MarketingPlanSerialier, FollowUpPlanSerializer, CampaignSerializer, CreateCampaignSerializer, CreateFollowUpPlanSerializer
from rest_framework import status
# Create your views here.


class MarketingPlanView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = MarketingPlan.objects
    serializer_class = MarketingPlanSerialier


class FollowUpPlanView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = FollowUpPlan.objects
    serializer_class = FollowUpPlanSerializer

    def create(self, request):
        serializer = CreateFollowUpPlanSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CampaignView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Campaign.objects
    serializer_class = CampaignSerializer

    def create(self, request):
        serializer = CreateCampaignSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CreateCampaignSerializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

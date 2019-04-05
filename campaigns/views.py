from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import MarketingPlan, FollowUpPlan, Campaign
from .serializers import MarketingPlanSerialier, FollowUpPlanSerializer, CampaignSerializer, CreateCampaignSerializer, CreateFollowUpPlanSerializer
from rest_framework import status
from .documents import MarketingPlanDocument
from django.forms.models import model_to_dict

# Create your views here.

ACTIONS = ['Send Email', 'Call Clients', 'Send Email Manually', 'Chat']


@api_view(['GET'])
def GetPlanAction(request):
    return Response({"actions": ACTIONS}, status=status.HTTP_200_OK)


class MarketingPlanView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = MarketingPlan.objects
    serializer_class = MarketingPlanSerialier

    def get_queryset(self):
        if not bool(self.request.query_params):
            return super().get_queryset()
        search = MarketingPlanDocument.search()

        if 'marketing_plan_suggest' in self.request.query_params.keys():
            qs = self.request.query_params.get('marketing_plan_suggest')
            suggest = search.suggest('auto_complete', qs, completion={
                                     'field': 'marketing_plans_name.suggest'
                                     })
            response = suggest.execute()
            suggestion = [
                option._source.marketing_plans_name for option in response.suggest.auto_complete[0].options]
            return {"suggestion": suggestion, "elastic_search": True}

        if 'name' in self.request.query_params.keys():
            qs = self.request.query_params.get('name')
            search = search.query('multi_match', query=qs, fields=['name^4'])
            marketing_plans = [model_to_dict(marketing_plans)
                               for marketing_plans in search.to_queryset()]
            return {"data": marketing_plans, "elastic_search": True}


class FollowUpPlanView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = FollowUpPlan.objects
    serializer_class = FollowUpPlanSerializer

    def list(self, request):
        limit = self.request.query_params.get('limit', None)
        page = self.request.query_params.get('page') if int(
            self.request.query_params.get('page', 0)) > 0 else 0
        if limit is not None:
            queryset = FollowUpPlan.objects.filter(manager=request.user)[
                int(page)*int(limit):int(page)*int(limit)+int(limit)]
        else:
            queryset = FollowUpPlan.objects.filter(manager=request.user)
        serializer = self.get_serializer(queryset, many=True)
        new_serializer = {}
        new_serializer['data'] = serializer.data
        new_serializer['total'] = FollowUpPlan.objects.filter(
            manager=request.user).count()
        return Response(new_serializer, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = CreateFollowUpPlanSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CreateFollowUpPlanSerializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


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

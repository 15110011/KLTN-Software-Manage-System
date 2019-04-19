from django.shortcuts import render
from django.db.models import Q, Count
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import MarketingPlan, FollowUpPlan, Campaign, Note, ContactMarketing, ContactMarketingHistory
from .serializers import MarketingPlanSerializer, FollowUpPlanSerializer, CampaignSerializer, CreateCampaignSerializer, CreateFollowUpPlanSerializer, CreateMarketingPlanSerializer, NoteSerializer, ContactMarketingSerializer, ContactMarketingHistorySerializer
from rest_framework import status
from .documents import MarketingPlanDocument, CampaignDocument
from django.forms.models import model_to_dict
from KLTN.common import MARKETING_PLAN_CONDITIONS
from orders.models import Order
from contacts.models import Contact
from contacts.serializers import ContactWithoutGroupSerializer


from datetime import datetime

# Create your views here.

ACTIONS = ['Send Email', 'Call Client', 'Send Email Manually']


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetPlanAction(request):
    return Response({"actions": ACTIONS}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetMarketingPlanConditions(request):
    return Response(MARKETING_PLAN_CONDITIONS, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def ContactMatchConditions(request):
    contacts = request.data.get('contacts', None)
    conditions = request.data.get('conditions', None)
    filters = Q()
    excludes = Q()
    for condition in conditions:
        if condition['operand'] == '1':
            if condition['operator'] == 'Equal to':
                filters.add(Q(state=condition['data']), Q.AND)
                filters.add(Q(id__in=[c['id'] for c in contacts]), Q.AND)
                queryset = Contact.objects.filter(filters)
                queryset = ContactWithoutGroupSerializer(
                    queryset, many=True).data
                return Response(queryset, status=status.HTTP_200_OK)

            if condition['operator'] == 'Not equal to':
                excludes.add(Q(state=condition['data']), Q.AND)
                filters.add(Q(id__in=[c['id'] for c in contacts]), Q.AND)
                queryset = Contact.objects.exclude(excludes)
                queryset = ContactWithoutGroupSerializer(
                    queryset, many=True).data
                return Response(queryset, status=status.HTTP_200_OK)

        if condition['operand'] == '2':
            try:
                if condition['operator'] == 'Equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).filter(
                        packages__features__product__product_type__name=condition['operand_type']).values('contacts').annotate(
                            total=Count('contacts')).filter(total=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Not equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).exclude(
                        packages__features__product__product_type__name=condition['operand_type']).values('contacts').annotate(
                            total=Count('contacts'))
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Greater than':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).filter(
                        packages__features__product__product_type__name=condition['operand_type']).values('contacts').annotate(
                            total=Count('contacts')).filter(total__gt=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Less than':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).filter(
                        packages__features__product__product_type__name=condition['operand_type']).values('contacts').annotate(
                            total=Count('contacts')).filter(total__lt=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Greater than or equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).filter(
                        packages__features__product__product_type__name=condition['operand_type']).values('contacts').annotate(
                            total=Count('contacts')).filter(total__gte=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Less than or equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).filter(
                        packages__features__product__product_type__name=condition['operand_type']).values('contacts').annotate(
                            total=Count('contacts')).filter(total__lte=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "OPERATOR_NOT_VALID"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"error": 'OPERATOR_CANNOT_BE_BLANK'}, status=status.HTTP_400_BAD_REQUEST)

        if condition['operand'] == '3':
            try:
                if condition['operator'] == 'Equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).filter(
                        packages__features__product__category__name=condition['operand_category']).values('contacts').annotate(
                        total=Count('contacts')).filter(total=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Not equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).exclude(
                        packages__features__product__category__name=condition['operand_category']).values('contacts').annotate(
                        total=Count('contacts')).filter(total=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Greater than':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).exclude(
                        packages__features__product__category__name=condition['operand_category']).values('contacts').annotate(
                        total=Count('contacts')).filter(total__gt=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Less than':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).exclude(
                        packages__features__product__category__name=condition['operand_category']).values('contacts').annotate(
                        total=Count('contacts')).filter(total__lt=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Greater than or equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).exclude(
                        packages__features__product__category__name=condition['operand_category']).values('contacts').annotate(
                        total=Count('contacts')).filter(total__gte=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)

                if condition['operator'] == 'Less than or equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).exclude(
                        packages__features__product__category__name=condition['operand_category']).values('contacts').annotate(
                        total=Count('contacts')).filter(total__lte=condition['data'])
                    return Response(queryset, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "OPERATOR_NOT_VALID"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"error": 'OPERATOR_CANNOT_BE_BLANK'}, status=status.HTTP_400_BAD_REQUEST)


class MarketingPlanView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = MarketingPlan.objects
    serializer_class = MarketingPlanSerializer

    def get_queryset(self):
        if not bool(self.request.query_params):
            return super().get_queryset()
        search = MarketingPlanDocument.search()

        if 'name' in self.request.query_params.keys():
            qs = self.request.query_params.get('name')
            search = search.query('multi_match', query=qs, fields=['name^4']).filter(
                'term', manager=self.request.user.id)

            marketing_plans = [model_to_dict(marketing_plans)
                               for marketing_plans in search.to_queryset()]
            return {"marketing_plans": marketing_plans, "elastic_search": True}

        if 'marketing_plan_suggest' in self.request.query_params.keys():
            qs = self.request.query_params.get('marketing_plan_suggest')
            suggest = search.suggest('auto_complete', qs, completion={
                'field': 'marketing_plans_name.suggest',
                'contexts': {'manager': self.request.user.id}
            })
            response = suggest.execute()
            suggestion = [
                option._source.marketing_plans_name for option in response.suggest.auto_complete[0].options]
            return {"suggestion": suggestion, "elastic_search": True}

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        if type(qs) is dict and qs.get('elastic_search', None):
            return Response(qs)
        limit = self.request.query_params.get('limit', None)
        page = self.request.query_params.get('page') if int(
            self.request.query_params.get('page', 0)) > 0 else 0
        if limit is not None:
            queryset = MarketingPlan.objects.filter(manager=request.user)[
                int(page)*int(limit):int(page)*int(limit)+int(limit)]
        else:
            queryset = qs.filter(manager=request.user)
        serializer = self.get_serializer(queryset, many=True)
        new_serializer = {}
        new_serializer['data'] = serializer.data
        new_serializer['total'] = MarketingPlan.objects.filter(
            manager=request.user).count()
        return Response(new_serializer, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = CreateMarketingPlanSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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
        serializer = CreateFollowUpPlanSerializer(data=request.data, context={'request': request})
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

    def get_queryset(self):
        if not bool(self.request.query_params):
            return super().get_queryset()
        search = CampaignDocument.search()

        if 'name' in self.request.query_params.keys():
            qs = self.request.query_params.get('name')
            search = search.query('multi_match', query=qs, fields=['name^4']).filter(
                'term', manager=self.request.user.id)

            campaigns = [model_to_dict(campaigns)
                         for campaigns in search.to_queryset()]
            return {"campaigns": campaigns, "elastic_search": True}

        if 'campaign_suggest' in self.request.query_params.keys():
            qs = self.request.query_params.get('campaign_suggest')
            suggest = search.suggest('auto_complete', qs, completion={
                'field': 'campaigns_name.suggest',
                'contexts': {'manager': self.request.user.id}
            })
            response = suggest.execute()
            suggestion = [
                option._source.campaigns_name for option in response.suggest.auto_complete[0].options]
            return {"suggestion": suggestion, "elastic_search": True}

    def list(self, request):
        qs = self.get_queryset()
        if type(qs) is dict and qs.get('elastic_search', None):
            return Response(qs)
        limit = self.request.query_params.get('limit', None)
        page = self.request.query_params.get('page') if int(
            self.request.query_params.get('page', 0)) > 0 else 0
        if limit is not None:
            queryset = Campaign.objects.filter(manager=request.user)[
                int(page)*int(limit):int(page)*int(limit)+int(limit)]
        else:
            queryset = Campaign.objects.filter(manager=request.user)
        serializer = self.get_serializer(queryset, many=True)
        new_serializer = {}
        new_serializer['data'] = serializer.data
        new_serializer['total'] = Campaign.objects.filter(
            manager=request.user).count()
        return Response(new_serializer, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = CreateCampaignSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CreateCampaignSerializer(
            instance, data=request.data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CampaignExtraView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Campaign.objects
    serializer_class = CampaignSerializer

    @action(detail=True, methods=['GET'])
    def note(self, request, pk=None):
        instance = self.get_object()
        _type = request.query_params.get('type', None)
        contact = request.query_params.get('contact', None)
        if _type or contact:

            notes = Note.objects.filter(
                campaign=instance.id).filter(_type=_type).filter(contact=int(contact)).filter(user=request.user)
            if len(notes) > 0:
                serializer = NoteSerializer(notes[0])
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Please provide more query params'}, status=status.HTTP_400_BAD_REQUEST)


class NoteView(ModelViewSet):

    permission_classes = (IsAuthenticated,)
    queryset = Note.objects
    serializer_class = NoteSerializer


class ContactMarketingView(ModelViewSet):

    permission_classes = (IsAuthenticated,)
    queryset = ContactMarketing.objects
    serializer_class = ContactMarketingSerializer

    def list(self, request, *args, **kwargs):
        filters = Q()
        excludes = Q()

        queryset = self.get_queryset()
        if not request.user.profile.is_manager:
            filters.add(Q(campaign__assigned_to__id=request.user.id), Q.AND)
        # pagin
        page = request.query_params.get(
            'page') if int(request.query_params.get('page', 0)) > 0 else 0

        limit = None
        if 'limit' in self.request.query_params:
            limit = self.request.query_params.get('limit')

        if limit:
            filters.add(Q(status='RUNNING'), Q.AND)
            queryset = queryset.exclude(excludes).filter(filters).order_by('modified')[
                int(page)*int(limit):int(page)*int(limit)+int(limit)]

            serializer = self.get_serializer(queryset, many=True)

        else:
            serializer = self.get_serializer(queryset.filter(
                filters), many=True)

        new_data = {
            "data": serializer.data,
            "total": ContactMarketing.objects.filter(filters).count()
        }

        return Response(new_data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=True)
    def history(self, request, pk=None):
        instance = self.get_object()
        # instance.modified = datetime.datetime.now
        instance.save()
        history = ContactMarketingHistory.objects.create(
            action=request.data['action'], contact_marketing=instance)
        serializer = ContactMarketingHistorySerializer(history)
        return Response(serializer.data, status=status.HTTP_200_OK)

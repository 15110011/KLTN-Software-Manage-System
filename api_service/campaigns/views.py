from datetime import datetime, timedelta
from contacts.serializers import ContactWithoutGroupSerializer
from contacts.models import Contact
from orders.models import Order
from KLTN.common import MARKETING_PLAN_CONDITIONS
from django.forms.models import model_to_dict
from django.db.models.functions import Lower
from .documents import MarketingPlanDocument, CampaignDocument
from rest_framework import status
from django.shortcuts import render
from django.db.models import Q, Count, CharField, Value as V
from django.db.models.functions import Concat, Lower
from django.db import models as DjangoModel
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import MethodNotAllowed

from .models import MarketingPlan, FollowUpPlan, Campaign, Note, ContactMarketing, ContactMarketingHistory, MailTemplate
from .serializers import MarketingPlanSerializer, FollowUpPlanSerializer, CampaignSerializer, CreateCampaignSerializer, CreateFollowUpPlanSerializer, CreateMarketingPlanSerializer, NoteSerializer, ContactMarketingSerializer, ContactMarketingHistorySerializer, MailTemplateSerializer, ContactMarketingSerializer2
import json
from contacts.state import reverse_state_hashes


# Create your views here.

ACTIONS = ['Send Email']


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
                filters.add(Q(state__in=condition['data']), Q.AND)
                filters.add(Q(id__in=[c['id'] for c in contacts]), Q.AND)
                queryset = Contact.objects.filter(filters)
                queryset = ContactWithoutGroupSerializer(
                    queryset, many=True).data
                return Response(queryset, status=status.HTTP_200_OK)

            if condition['operator'] == 'Not equal to':
                excludes.add(Q(state__in=condition['data']), Q.AND)
                filters.add(Q(id__in=[c['id'] for c in contacts]), Q.AND)
                queryset = Contact.objects.exclude(excludes).filter(filters)
                queryset = ContactWithoutGroupSerializer(
                    queryset, many=True).data
                return Response(queryset, status=status.HTTP_200_OK)

        if condition['operand'] == '2':
            try:
                if condition['operator'] == 'Equal to':
                    queryset = Order.objects.filter(contacts__in=[c['id'] for c in contacts]).filter(
                        packages__features__product__product_type__name=condition['operand_type']).values('contacts').annotate(total=Count('contacts')).filter(total=condition['data'])

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
            marketing_plans = []
            for mp in search.to_queryset():
                # cur_mail= MailTemplate.objects.get(id=mp.mail_template)
                mp = {
                    **model_to_dict(mp), "mail_template": model_to_dict(mp.mail_template)}
                marketing_plans.append(mp)
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
        serializer = CreateMarketingPlanSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['DELETE'])
    def batchdelete(self, request):
        marketing_plan = MarketingPlan.objects.filter(
            id__in=request.data['marketing_plans']).delete()

        return Response({"msg": 'OK'}, status=status.HTTP_200_OK)


class FollowUpPlanView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = FollowUpPlan.objects
    serializer_class = FollowUpPlanSerializer

    def list(self, request):
        suggest_query = request.query_params.get('followup_plan_suggest', None)
        name = request.query_params.get('name', None)
        if suggest_query:
            queryset = FollowUpPlan.objects.filter(
                manager=request.user).filter(name__icontains=suggest_query)
            serializer = self.get_serializer(queryset, many=True)

            return Response({"suggestion": [f['name'] for f in serializer.data]}, status=status.HTTP_200_OK)
        elif name:
            queryset = FollowUpPlan.objects.filter(
                manager=request.user).filter(name=name)
            serializer = self.get_serializer(queryset, many=True)

            return Response({"follow_up_plans": serializer.data}, status=status.HTTP_200_OK)
        else:
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
        serializer = CreateFollowUpPlanSerializer(
            data=request.data, context={'request': request})
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

    @action(detail=False, methods=['DELETE'])
    def batchdelete(self, request):
        follow_ups = FollowUpPlan.objects.filter(
            id__in=request.data['follow_ups']).delete()

        return Response({"msg": 'OK'}, status=status.HTTP_200_OK)


class CampaignView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Campaign.objects.prefetch_related('packages', 'orders')
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
        now = datetime.now()

        filters = Q()
        filters.add(Q(manager=request.user), Q.AND)
        limit = self.request.query_params.get('limit', None)
        page = self.request.query_params.get('page') if int(
            self.request.query_params.get('page', 0)) > 0 else 0
        type_ = request.query_params.get('type', 'manager')
        selecting_state = request.query_params.get('selectingState', None)
        # Filter
        campaign_name = request.query_params.get('campaign_name', None)
        product_name = request.query_params.get('product_name', None)
        start_from = request.query_params.get('start_from', None)
        start_to = request.query_params.get('start_to', None)
        end_from = request.query_params.get('end_from', None)
        end_to = request.query_params.get('end_to', None)

        campaign_status = request.query_params.get('status', None)
        if selecting_state:
            filters.add(~Q(marketing_plan__condition__must__operand='1'), Q.OR)
            filters.add(Q(marketing_plan__condition__must__operand='1') & Q(marketing_plan__condition__must__operator='Equal to') & Q(
                marketing_plan__condition__must__data__any=selecting_state), Q.OR)
            filters.add(Q(marketing_plan__condition__must__operand='1') & Q(marketing_plan__condition__must__operator='Not equal to') & ~Q(
                marketing_plan__condition__must__data__any=selecting_state), Q.OR)
        if campaign_name:
            filters.add(Q(name__icontains=campaign_name), Q.AND)

        if product_name:
            filters.add(
                Q(packages__features__product__name__icontains=product_name), Q.AND)
        if start_from and start_to:
            filters.add(
                Q(start_date__range=[start_from, start_to]), Q.AND)
        elif start_from:
            filters.add(
                Q(start_date__gte=start_from), Q.AND)
        elif start_to:
            filters.add(
                Q(start_date__lte=start_to), Q.AND)
        if end_from and end_to:
            filters.add(
                Q(end_date__range=[end_from, end_to]), Q.AND)
        elif end_from:
            filters.add(
                Q(end_date__gte=end_from), Q.AND)
        elif end_to:
            filters.add(
                Q(end_date__lte=end_to), Q.AND)
        if type_ == 'both':
            filters.add(Q(assigned_to=request.user), Q.OR)
            if selecting_state:
                filters.add(
                    Q(marketing_plan__condition__must__contains={"operand": '2'}), Q.AND)
                # filters.add(Q(marketing_plan__condition__must__operand='1') & Q(marketing_plan__condition__must__operator='Equal to') & Q(marketing_plan__condition__must__data__any = selecting_state), Q.OR)
                # filters.add(Q(marketing_plan__condition__must__operand='1') & Q(marketing_plan__condition__must__operator='Not equal to') & ~Q(marketing_plan__condition__must__data__any = selecting_state), Q.OR)

        if campaign_status:
            statuses = campaign_status.split(',')
            status_filters = Q()
            for s in statuses:
                if s == 'Idle':
                    status_filters.add(Q(start_date__gt=now), Q.OR)
                elif s == 'Active':
                    status_filters.add(Q(start_date__lte=now)
                                       & Q(end_date__gte=now), Q.OR)
                elif s == 'Finished':
                    status_filters.add(Q(end_date__lt=now), Q.OR)

            filters.add(status_filters, Q.AND)

        # order
        name_order = request.query_params.get('name_order', None)
        product_order = request.query_params.get('product_order', None)
        start_order = request.query_params.get('start_order', None)
        end_order = request.query_params.get('end_order', None)
        status_order = request.query_params.get('status_order', None)
        queryset = Campaign.objects.filter(filters)
        if name_order:
            name_order = Lower('name').desc(
            ) if name_order == 'desc' else Lower('name').asc()
            queryset = queryset.order_by(name_order)
        if product_order:
            product_order = Lower('packages__features__product__name').desc(
            ) if product_order == 'desc' else Lower('packages__features__product__name').asc()
            queryset = queryset.order_by(product_order)
        if start_order:
            start_order = '-start_date' if start_order == 'desc' else 'start_date'
            queryset = queryset.order_by(start_order)
        if end_order:
            end_order = '-end_date' if end_order == 'desc' else 'end_date'
            queryset = queryset.order_by(end_order)
        if status_order:
            status_order = '-status' if status_order == 'desc' else 'status'
            queryset = queryset.annotate(status=DjangoModel.Case(
                DjangoModel.When(
                    start_date__gt=now, then=DjangoModel.Value(0)),
                DjangoModel.When(start_date__lte=now,
                                 end_date__gte=now, then=DjangoModel.Value(1)),
                DjangoModel.When(
                    end_date__lt=now, then=DjangoModel.Value(2)),
                output_field=DjangoModel.IntegerField()
            )).order_by(status_order)
        if limit is not None:
            queryset = queryset[int(page)*int(limit)                                :int(page)*int(limit)+int(limit)]
        serializer = self.get_serializer(queryset, many=True)
        new_serializer = {}
        new_serializer['data'] = serializer.data
        new_serializer['total'] = Campaign.objects.filter(filters).count()
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
        if request.data.get('start_date', None):
            instance = self.get_object()
            for m in instance.contact_marketing_plan.all():
                for e in m.events.all():
                    e.start_date = request.data.get('start_date')
                    e.end_date = datetime.strptime(request.data.get(
                        'start_date'), '%Y-%m-%d') + timedelta(days=1)
                    e.save()
        serializer = CreateCampaignSerializer(
            instance, data=request.data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({'msg': 'Remove OK'}, status=status.HTTP_200_OK)


class CampaignExtraView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Campaign.objects.prefetch_related('packages', 'orders')
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


class AssignedCampaigns(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Campaign.objects.prefetch_related('packages', 'orders')
    serializer_class = CampaignSerializer
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        suggest = request.query_params.get('suggest', None)
        now = datetime.now()

        if suggest:
            instance = request.user
            queryset = self.get_queryset().filter(start_date__lte=now).filter(
                end_date__gte=now).filter(assigned_to__id=instance.id).filter(name__icontains=suggest)
            serializer = CampaignSerializer(queryset, many=True)
            return Response({"suggestion": serializer.data, 'total': len(serializer.data)})
        instance = request.user
        queryset = self.get_queryset().filter(start_date__lte=now).filter(
            end_date__gte=now).filter(assigned_to__id=instance.id)
        serializer = CampaignSerializer(queryset, many=True)
        return Response({'data': serializer.data, 'total': len(serializer.data)})

    def retrieve(self, request, *args, **kwargs):
        raise MethodNotAllowed('GET')


class NoteView(ModelViewSet):

    permission_classes = (IsAuthenticated,)
    queryset = Note.objects
    serializer_class = NoteSerializer


class ContactMarketingView(ModelViewSet):

    # permission_classes = (IsAuthenticated,)
    queryset = ContactMarketing.objects.select_related(
        'campaign', 'contact', 'marketing_plan')
    serializer_class = ContactMarketingSerializer

    def create(self, request, *args, **kwargs):
        serializer = ContactMarketingSerializer2(
            data=request.data, context={"request": request})
        serializer.is_valid()
        created = self.perform_create(serializer)
        return Response(created)

    def list(self, request, *args, **kwargs):
        filters = Q()
        excludes = Q()
        now = datetime.now()

        queryset = self.get_queryset()
        if not request.user.profile.is_manager:
            filters.add(Q(campaign__assigned_to__id=request.user.id), Q.AND)
            filters.add(Q(campaign__start_date__lte=now) &
                        Q(campaign__end_date__gte=now), Q.AND)
        # pagin
        page = request.query_params.get(
            'page') if int(request.query_params.get('page', 0)) > 0 else 0

        limit = None
        if 'limit' in self.request.query_params:
            limit = self.request.query_params.get('limit')

        # Filter
        contact_name = request.query_params.get('contact_name', None)
        email = request.query_params.get('email', None)
        phone = request.query_params.get('phone', None)
        campaign = request.query_params.get('campaign', None)
        selecting_state = request.query_params.get('selectingState', None)
        state = request.query_params.get('state', None)
        created = request.query_params.get('created', None)
        modified = request.query_params.get('modified', None)
        status_contact = request.query_params.get('status', None)
        if selecting_state:
            filters.add(Q(contact__state=selecting_state), Q.AND)
        if contact_name:
            filters.add(Q(contact__first_name__icontains=contact_name) | Q(
                contact__last_name__icontains=contact_name) | Q(full_name__icontains=contact_name), Q.AND)
        if email:
            filters.add(Q(contact__mail__icontains=email), Q.AND)
        if phone:
            filters.add(Q(contact__phone__icontains=phone), Q.AND)
        if campaign:
            filters.add(Q(campaign__name__icontains=campaign), Q.AND)
        if state:
            try:
                filters.add(
                    Q(contact__state__icontains=reverse_state_hashes[state]), Q.AND)
            except:
                pass
        if created:
            filters.add(Q(created__date=created), Q.AND)
        if modified:
            filters.add(Q(modified__date=modified), Q.AND)
        if status_contact:
            status_contact = status_contact.split(',')
            status_filters = Q()
            if 'short' in status_contact:
                status_filters.add(
                    Q(modified__range=[now - timedelta(days=4), now]), Q.OR)
            if 'med' in status_contact:
                status_filters.add(
                    Q(modified__range=[now - timedelta(days=15), now - timedelta(days=5)]), Q.OR)
            if 'long' in status_contact:
                status_filters.add(
                    Q(modified__lt=now - timedelta(days=15)), Q.OR)
            filters.add(status_filters, Q.AND)
        filters.add(Q(status='RUNNING'), Q.AND)
        queryset = queryset.annotate(full_name=Concat('contact__first_name', V(
            ' '), 'contact__last_name', output_field=CharField())).exclude(excludes).filter(filters)
        # Order
        contact_name_order = request.query_params.get(
            'contact_name_order', None)
        email_order = request.query_params.get(
            'email_order', None)
        campaign_order = request.query_params.get(
            'campaign_order', None)
        created_order = request.query_params.get(
            'created_order', None)
        modified_order = request.query_params.get(
            'modified_order', None)
        status_order = request.query_params.get(
            'status_order', None)
        if contact_name_order:
            first_name_order = '-contact__first_name' if contact_name_order == 'desc' else 'contact__first_name'
            last_name_order = '-contact__last_name' if contact_name_order == 'desc' else 'contact__last_name'
            queryset = queryset.order_by(first_name_order, last_name_order)
        if email_order:
            email_order = '-contact__mail' if email_order == 'desc' else 'contact__mail'
            queryset = queryset.order_by(email_order)
        if campaign_order:
            campaign_order = '-campaign__name' if campaign_order == 'desc' else 'campaign__name'
            queryset = queryset.order_by(campaign_order)
        if created_order:
            created_order = '-created' if created_order == 'desc' else 'created'
            queryset = queryset.order_by(created_order)
        if modified_order:
            modified_order = '-modified' if modified_order == 'desc' else 'modified'
            queryset = queryset.order_by(modified_order)
        if status_order:
            status_order = '-modified' if status_order == 'desc' else 'modified'
            queryset = queryset.order_by(status_order)

        if limit:
            query = queryset[
                int(page)*int(limit):int(page)*int(limit)+int(limit)]
            serializer = self.get_serializer(query, many=True)

        else:
            serializer = self.get_serializer(queryset, many=True)

        new_data = {
            "data": serializer.data,
            "total": queryset.count()
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

    @action(methods=['PATCH'], detail=False)
    def update_by_thread(self, request):
        thread_id = request.data.get('thread_id', None)
        now = datetime.now()
        try:
            instance = ContactMarketing.objects.get(
                thread_ids__contains=[{"thread_id": thread_id}])
        except:
            return Response({"msg": "OK"}, status=status.HTTP_400_BAD_REQUEST)
        #instance.modified = now
        instance.save()
        return Response({"msg": "OK"}, status=status.HTTP_200_OK)


class MailTemplateView(ModelViewSet):

    serializer_class = MailTemplateSerializer
    queryset = MailTemplate.objects

    def list(self, request, *args, **kwargs):
        import django_rq

        scheduler = django_rq.get_scheduler('default')
        jobs_and_times = scheduler.get_jobs(with_times=True)

        filters = Q()
        filters.add(Q(user=request.user.id), Q.AND)
        filters.add(Q(is_public=True), Q.OR)
        name = request.query_params.get('name', None)
        if name:
            filters.add(Q(name__icontains=name), Q.AND)

        query = self.get_queryset().filter(filters)
        serializer = self.get_serializer(query, many=True)
        new_data = {
            "data": serializer.data,
            "total": len(serializer.data)
        }

        return Response(new_data, status=status.HTTP_200_OK)

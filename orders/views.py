from django.shortcuts import render
from django.db.models import Q
from django.db.models.functions import Concat, Lower
from django.db.models import Count, CharField, Value as V, Case, When, IntegerField

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from .serializers import OrderSerializer, OrderHistorySerializer, CreateOrderSerialzier, LicenseSerializer, LifetimeLicenseSerializer, CreateLicenseSerializer, CreateLifetimeLicenseSerializer, OrderChartSerializer
from .models import Order, OrderHistory, License, LifetimeLicense
from steps.models import StepDetail
from datetime import datetime, date
# Create your views here.
now = datetime.now()
cur_year = datetime.today().year
start_date_of_year = date(cur_year, 1, 1)


class OrderChartView(ModelViewSet):

    queryset = Order.objects.select_related('campaign')
    serializer_class = OrderChartSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        filters = Q()

        queryset = self.get_queryset()
        filters.add(Q(status='COMPLETED'), Q.AND)

        # Chart product
        chart_type = request.query_params.get('chart_type', 'product')
        duration = request.query_params.get('duration', 'month')

        if chart_type == 'product':
            if duration == 'month':
                filters.add(Q(created__gte=start_date_of_year), Q.AND)
                queryset = queryset.filter(filters)
                queryset = queryset.annotate(month_group=Case(
                    When(created__month=1, then=V(1)),
                    When(created__month=2, then=V(2)),
                    When(created__month=3, then=V(3)),
                    When(created__month=4, then=V(4)),
                    When(created__month=5, then=V(5)),
                    When(created__month=6, then=V(6)),
                    When(created__month=7, then=V(7)),
                    When(created__month=8, then=V(8)),
                    When(created__month=9, then=V(9)),
                    When(created__month=10, then=V(10)),
                    When(created__month=11, then=V(11)),
                    When(created__month=12, then=V(12)),
                    output_field=IntegerField())).order_by('month_group')
                order_serializer = self.get_serializer(queryset, many=True)

                order_data = {}
                for d in order_serializer.data:
                    if d['month_group'] not in order_data:
                        order_data[d['month_group']] = {
                            'number': {'total': 0, 'products': {}}, 'income': {'total': 0, 'products': {}}}

                    for p in d['packages']:
                        if p['product_']['id'] not in order_data[d['month_group']]['number']['products']:
                            order_data[d['month_group']]['number']['products'][p['product_']['id']] = {
                                'id': p['product_']['id'],
                                'name': p['product_']['name'],
                                'count': 0
                            }
                        order_data[d['month_group']]['number']['total'] += 1
                        order_data[d['month_group']]['number']['products'][p['product_']['id']] = {
                            'id': p['product_']['id'],
                            'name': p['product_']['name'],
                            'count': order_data[d['month_group']]['number']['products'][p['product_']['id']]['count'] + 1
                        }
                for d in order_serializer.data:
                    for l in d['licenses']:
                        if l['package']['product_']['id'] not in order_data[d['month_group']]['income']['products']:
                            order_data[d['month_group']]['income']['products'][l['package']['product_']['id']] = {
                                'id': l['package']['product_']['id'],
                                'name': l['package']['product_']['name'],
                                'count': 0
                            }
                        order_data[d['month_group']
                                   ]['income']['total'] += l['package']['prices'][str(l['duration'])]
                        order_data[d['month_group']]['income']['products'][l['package']['product_']['id']] = {
                            'id': l['package']['product_']['id'],
                            'name': l['package']['product_']['name'],
                            'count': order_data[d['month_group']]['income']['products'][l['package']['product_']['id']]['count'] + l['package']['prices'][str(l['duration'])]
                        }
                for d in order_serializer.data:
                    for l in d['lifetime_licenses']:
                        if l['package']['product_']['id'] not in order_data[d['month_group']]['income']['products']:
                            order_data[d['month_group']]['income']['products'][l['package']['product_']['id']] = {
                                'id': l['package']['product_']['id'],
                                'name': l['package']['product_']['name'],
                                'count': 0
                            }
                        order_data[d['month_group']
                                   ]['income']['total'] += l['package']['prices']['999999']
                        order_data[d['month_group']]['income']['products'][l['package']['product_']['id']] = {
                            'id': l['package']['product_']['id'],
                            'name': l['package']['product_']['name'],
                            'count': order_data[d['month_group']]['income']['products'][l['package']['product_']['id']]['count'] + l['package']['prices']['999999']
                        }

                return Response(order_data)


class OrderView(ModelViewSet):
    queryset = Order.objects.prefetch_related('packages')
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        filters = Q()

        queryset = self.get_queryset()
        if not request.user.profile.is_manager:
            filters.add(Q(campaign__assigned_to=request.user), Q.AND)
            filters.add(Q(campaign__start_date__lte=now) &
                        Q(campaign__end_date__gte=now), Q.AND)
        order_status = request.query_params.get('status', 'RUNNING')
        filters.add(Q(status=order_status), Q.AND)
        page = request.query_params.get(
            'page') if int(request.query_params.get('page', 0)) > 0 else 0

        limit = None
        if 'limit' in self.request.query_params:
            limit = self.request.query_params.get('limit')

        # filter
        contact_name = request.query_params.get('contact_name', None)
        email = request.query_params.get('email', None)
        phone = request.query_params.get('phone', None)
        campaign = request.query_params.get('campaign', None)
        no_steps = request.query_params.get('no_steps', None)
        if contact_name:
            filters.add(Q(contacts__first_name__icontains=contact_name) | Q(
                contacts__last_name__icontains=contact_name) | Q(full_name__icontains=contact_name), Q.AND)
        if email:
            filters.add(Q(contacts__mail__icontains=email), Q.AND)
        if phone:
            filters.add(Q(contacts__phone__icontains=phone), Q.AND)
        if campaign:
            filters.add(Q(campaign__name__icontains=campaign), Q.AND)
        if no_steps:
            filters.add(Q(no_steps=int(no_steps)), Q.AND)

        queryset = queryset.annotate(no_steps=Count('campaign__follow_up_plan__steps')).annotate(progress=Count('step_details', filter=Q(step_details__status='COMPLETED'))/Count('campaign__follow_up_plan__steps')).annotate(
            full_name=Concat('contacts__first_name', V(' '), 'contacts__last_name', output_field=CharField())).filter(filters)
        # order
        contact_order = request.query_params.get('contact_order', None)
        email_order = request.query_params.get('email_order', None)
        campaign_order = request.query_params.get('campaign_order', None)
        no_steps_order = request.query_params.get('no_steps_order', None)
        progress_order = request.query_params.get('progress_order', None)
        if contact_order:

            first_name_order = Lower('contacts__first_name').desc(
            ) if contact_order == 'desc' else Lower('contacts__last_name').asc()
            last_name_order = Lower('contacts__last_name').desc(
            ) if contact_order == 'desc' else Lower('contacts__last_name').asc()
            queryset = queryset.order_by(first_name_order, last_name_order)
        elif email_order:
            email_order = Lower('contacts__mail').desc(
            ) if email_order == 'desc' else Lower('contacts__mail').asc()
            queryset = queryset.order_by(email_order)
        elif campaign_order:
            campaign_order = '-campaign__name' if campaign_order == 'desc' else 'campaign__name'
            queryset = queryset.order_by(campaign_order)
        elif no_steps_order:
            no_steps_order = '-no_steps' if no_steps_order == 'desc' else 'no_steps'
            queryset = queryset.order_by(no_steps)
        elif progress_order:
            progress_order = '-progress' if progress_order == 'desc' else 'progress'
            queryset = queryset.order_by(progress_order)
        if limit:
            query = queryset[
                int(page)*int(limit):int(page)*int(limit)+int(limit)]
            serializer = self.get_serializer(query, many=True)

        else:

            serializer = self.get_serializer(queryset.filter(
                filters), many=True)

        new_data = {
            "data": serializer.data,
            "total": queryset.count()
        }

        return Response(new_data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerialzier(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CreateOrderSerialzier(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=True)
    def history(self, request, pk=None):
        instance = self.get_object()
        # instance.modified = datetime.datetime.now
        instance.save()
        step_detail = StepDetail.objects.get(id=request.data['step_detail'])
        history = OrderHistory.objects.create(
            action=request.data['action'], order=instance, step_detail=step_detail)
        serializer = OrderHistorySerializer(history)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderHistoryView(ModelViewSet):
    queryset = OrderHistory.objects
    serializer_class = OrderHistorySerializer
    permission_classes = (IsAuthenticated,)


class LicenseView(ModelViewSet):
    queryset = License.objects.select_related('package')
    serializer_class = LicenseSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = CreateLicenseSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = CreateLicenseSerializer(instance,
                                             data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LifetimeLicenseView(ModelViewSet):
    queryset = LifetimeLicense.objects
    serializer_class = LifetimeLicenseSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = CreateLifetimeLicenseSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = CreateLifetimeLicenseSerializer(instance,
                                                     data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

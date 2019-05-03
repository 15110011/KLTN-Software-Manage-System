from django.shortcuts import render
from django.db.models import Q
from django.db.models.functions import Concat, Lower
from django.db.models import Count, CharField, Value as V

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from .serializers import OrderSerializer, OrderHistorySerializer, CreateOrderSerialzier, LicenseSerializer, LifetimeLicenseSerializer
from .models import Order, OrderHistory, License, LifetimeLicense
from steps.models import StepDetail
from datetime import datetime
# Create your views here.
now = datetime.now()


class OrderView(ModelViewSet):
    queryset = Order.objects.select_related('campaign')
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
    queryset = License.objects
    serializer_class = LicenseSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = LicenseSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LifetimeLicenseView(ModelViewSet):
    queryset = LifetimeLicense.objects
    serializer_class = LifetimeLicenseSerializer
    permission_classes = (IsAuthenticated,)

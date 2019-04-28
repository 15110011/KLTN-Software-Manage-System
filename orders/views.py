from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .serializers import OrderSerializer, OrderHistorySerializer, CreateOrderSerialzier, LicenseSerializer, LifetimeLicenseSerializer
from .models import Order, OrderHistory, License, LifetimeLicense

# Create your views here.


class OrderView(ModelViewSet):
    queryset = Order.objects.select_related('campaign')
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

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


class OrderHistoryView(ModelViewSet):
    queryset = OrderHistory.objects
    serializer_class = OrderHistorySerializer
    permission_classes = (IsAuthenticated,)


class LicenseView(ModelViewSet):
    queryset = License.objects
    serializer_class = LicenseSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = LicenseSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LifetimeLicenseView(ModelViewSet):
    queryset = LifetimeLicense.objects
    serializer_class = LifetimeLicenseSerializer
    permission_classes = (IsAuthenticated,)

from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .serializers import OrderSerializer, OrderHistorySerializer, PackageOrderSerialzier, CreateOrderSerialzier
from .models import Order, OrderHistory, PackageOrder

# Create your views here.


class OrderView(ModelViewSet):
    queryset = Order.objects
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerialzier(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class OrderHistoryView(ModelViewSet):
    queryset = OrderHistory.objects
    serializer_class = OrderHistorySerializer


class PackageOrderView(ModelViewSet):
    queryset = PackageOrder.objects
    serializer_class = PackageOrderSerialzier

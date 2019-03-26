from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .serializers import OrderSerializer, OrderHistorySerializer
from .models import Order, OrderHistory

# Create your views here.

class OrderView(ModelViewSet):
    queryset = Order.objects
    serializer_class = OrderSerializer

class OrderHistoryView(ModelViewSet):
    queryset = OrderHistory.objects
    serializer_class = OrderHistorySerializer
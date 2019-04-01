from django.shortcuts import render
from django.db.models import Q
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework import status
from .serializers import ProductSerializier, PackageSerializer, CreateProductSerializer, PackageHistorySerializer
from .models import Product, Package, PackageHistory
from .documents import ProductDocument
# Create your views here.


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializier
    queryset = Product.objects.prefetch_related('features')
    permission_classes = (IsAuthenticated,)


    # def get_queryset(self):


    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(manager=request.user)
        serializer = self.get_serializer(queryset, many=True)
        filters = Q()
        new_serializer ={}
        new_serializer['data'] = serializer.data
        new_serializer['total'] = queryset.count()
        return Response(new_serializer, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = CreateProductSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CreateProductSerializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PackageViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PackageSerializer
    queryset = Package.objects


class PackageHistoryViewSet(ModelViewSet):
    serializer_class = PackageHistorySerializer
    queryset = PackageHistory.objects

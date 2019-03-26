from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework import status
from .serializers import ProductSerializier, PackageSerializer, CreateProductSerializer, PackageHistorySerializer
from .models import Product, Package, PackageHistory
# Create your views here.


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializier
    queryset = Product.objects.prefetch_related('packages')
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = CreateProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PackageViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PackageSerializer
    queryset = Package.objects

class PackageHistoryViewSet(ModelViewSet):
    serializer_class = PackageHistorySerializer
    queryset = PackageHistory.objects
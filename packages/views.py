from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import ProductSerializier, PackageSerializer
from .models import Product, Package
# Create your views here.


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializier
    queryset = Product.objects.prefetch_related('packages')


class PackageViewSet(ModelViewSet):
    serializer_class = PackageSerializer
    queryset = Package.objects

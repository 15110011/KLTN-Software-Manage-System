from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import ProductSerializier, PackageSerializer, ProductPackageSerializer
from .models import Product, Package, ProductPackage
# Create your views here.


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializier
    queryset = Product.objects.all()


class PackageViewSet(ModelViewSet):
    serializer_class = PackageSerializer
    queryset = Package.objects.all()


class ProductPackageViewSet(ModelViewSet):
    serializer_class = ProductPackageSerializer
    queryset = ProductPackage.objects.all()

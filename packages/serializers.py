from rest_framework import serializers
from .models import Product, Package, ProductPackage
from django.contrib.postgres.fields import JSONField
from account.serializers import MeSerializer
from django.contrib.auth import get_user_model


class ProductPackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductPackage
        fields = '__all__'


class ProductSerializier(serializers.ModelSerializer):
    manager = MeSerializer()
    packages = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_packages(self, model):
        return model.packages.values()


class PackageSerializer(serializers.ModelSerializer):
    products = ProductSerializier(many=True)
    creator = MeSerializer()

    class Meta:
        model = Package
        fields = '__all__'

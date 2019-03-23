from rest_framework import serializers
from .models import Product, Package
from account.serializers import MeSerializer
from django.contrib.auth import get_user_model


class ProductSerializier(serializers.ModelSerializer):
    manager = MeSerializer()
    packages = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_packages(self, model):
        return model.packages.values()


class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Package
        fields = '__all__'

    def create(self, validated_data):
        packages = super().create(validated_data)
        return packages

class CreateProductSerializer(serializers.ModelSerializer):
    packages = PackageSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        packages = [Package(**item) for item in validated_data.pop('packages')]
        packages = Package.objects.bulk_create(packages)
        product = super().create(validated_data)
        product.packages.add(*packages)
        return product

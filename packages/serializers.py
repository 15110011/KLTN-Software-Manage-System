from rest_framework import serializers
from .models import Product, Package, Feature, PackageHistory
from account.serializers import MeSerializer
from django.contrib.auth import get_user_model


class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Package
        fields = '__all__'

    def create(self, validated_data):
        package = super().create(validated_data)
        return package


class FeatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feature
        fields = '__all__'



class PackageHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageHistory
        fields = '__al__'


class CreateProductSerializer(serializers.ModelSerializer):
    packages = PackageSerializer(many=True)

    class Meta:
        model = Feature
        fields = '__all__'


class ProductSerializier(serializers.ModelSerializer):
    manager = MeSerializer()
    features = FeatureSerializer(many=True) 
    packages = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_packages(self, instance):
        print(instance.features)
        return  ['a']


class CreateProductSerializer(serializers.ModelSerializer):

    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())
    features = FeatureSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        product = super().create(validated_data)
        return product

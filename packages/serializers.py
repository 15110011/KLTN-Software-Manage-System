
from django.contrib.auth import get_user_model

from rest_framework.fields import set_value
from rest_framework import serializers

from .models import Product, Package, Feature, PackageHistory
from account.serializers import MeSerializer

class FeatureSerializer(serializers.ModelSerializer):

    label = serializers.SerializerMethodField()
    value = serializers.SerializerMethodField()

    class Meta:
        model = Feature
        exclude = ['product']

    def get_label(self, instance):

        return instance.name
    
    def get_value(self, instance):

        return instance.id

class PackageSerializer(serializers.ModelSerializer):

    numbers = serializers.SerializerMethodField()

    class Meta:
        model = Package
        fields = '__all__'

    def create(self, validated_data):
        package = super().create(validated_data)
        return package

    def get_numbers(self, instance):
        features_serialized = FeatureSerializer(instance.features.all(), many=True)
        return features_serialized.data


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
        features = instance.features.all()
        packages = Package.objects.filter(features__in=features).distinct('id')
        package_serialized = PackageSerializer(packages, many=True)
        return package_serialized.data 


class CreateProductSerializer(serializers.ModelSerializer):

    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())
    features = FeatureSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        # packages = [Package(**p) for p in validated_data.pop('packages')]
        packages = validated_data.pop('packages')
        features = validated_data.pop('features')
        product = super().create(validated_data)
        features = [Feature(**f, product=product)
                    for f in features]
        features = Feature.objects.bulk_create(features)
        new_packages = []
        for p in packages:
            cur_features = []
            for num in p['numbers']:
                for f in features:
                    if f.number == num:
                        cur_features.append(f)
            
            cur_package = Package(name=p['name'], prices=p['prices'], discount=p['discount'])

            cur_package.save()
            cur_package.features.set(cur_features)
        return product

    def to_internal_value(self, data):
        ret = super().to_internal_value(data)
        if 'packages' in data:
            set_value(ret, ['packages'], data['packages'])
        return ret

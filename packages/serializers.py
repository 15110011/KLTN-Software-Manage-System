
from django.contrib.auth import get_user_model

from rest_framework.fields import set_value
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Product, Package, Feature, PackageHistory
from account.serializers import MeSerializer


class FeatureSerializer(serializers.ModelSerializer):

    label = serializers.SerializerMethodField()
    value = serializers.SerializerMethodField()
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Feature
        exclude = ['product']

    def get_label(self, instance):

        return instance.name

    def get_value(self, instance):

        return instance.id


class PackageSerializer(serializers.ModelSerializer):

    numbers = serializers.SerializerMethodField()
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Package
        fields = '__all__'

    def create(self, validated_data):
        package = super().create(validated_data)
        return package

    def get_numbers(self, instance):
        features_serialized = FeatureSerializer(
            instance.features.all(), many=True)
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
    packages = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_packages(self, instance):
        features = instance.features.all()
        packages = Package.objects.filter(features__in=features).distinct('id')
        package_serialized = PackageSerializer(packages, many=True)
        return package_serialized.data

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

            cur_package = Package(
                name=p['name'], prices=p['prices'], discount=p['discount'])

            cur_package.save()
            cur_package.features.set(cur_features)
        return product

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.desc = validated_data.get('desc', instance.desc)
        instance.status = validated_data.get('status', instance.status)
        instance.start_sale_date = validated_data.get(
            'start_sale_date', instance.start_sale_date)
        instance.start_support_date = validated_data.get(
            'start_support_date', instance.start_support_date)
        instance.save()

        packages = validated_data.get('packages')
        features = validated_data.get('features')
        cur_features = []
        if features is not None:
            for item in features:
                try:
                    feature_id = item['id']
                    feature = Feature.objects.get(id=feature_id)
                    feature.name = item.get('name', feature.name)
                    feature.desc = item.get('desc', feature.desc)
                    feature.price = item.get('price', feature.price)
                    feature.number = item.get('number', feature.number)
                    feature.save()
                except:
                    feature = Feature(**item, product=instance)
                    feature.save()
                finally: 
                    cur_features.append(feature)
        
        serialized_features = FeatureSerializer(instance.features.all(), many = True)
        print(serialized_features)
        print(cur_features)
        have_to_remove = [d['id'] for d in serialized_features.data if d['id'] not in [f.id for f in cur_features]]
        Feature.objects.filter(id__in=have_to_remove).delete()

        if packages is not None:
            instance.packages = []
            for item in packages:
                features = item.pop('features')
                numbers = item.pop('numbers')
                try:
                    package_id = item['id']
                    package = Package.objects.get(id=package_id)
                    package.name = item.get('name', package.name)
                    package.discount = item.get('discount', package.discount)
                    package.prices = item.get('prices', package.prices)
                    package.note = item.get('note', package.note)
                    package.save()
                except:
                    package = Package(**item)
                    package.save()
                finally: 
                    found_features = [f for f in cur_features if f.number in numbers]
                    package.features.set(found_features)
        return instance

    def to_internal_value(self, data):
        ret = super().to_internal_value(data)
        if 'packages' in data:
            set_value(ret, ['packages'], data['packages'])
        return ret

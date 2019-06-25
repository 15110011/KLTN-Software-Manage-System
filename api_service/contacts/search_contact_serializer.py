from rest_framework import serializers
from orders.models import Order
from packages.serializers import PackageSerializer
from campaigns.models import Campaign


class OrderContactSerializer(serializers.ModelSerializer):
    packages = PackageSerializer(many=True)

    class Meta:
        model = Order
        exclude = ['contacts', ]

from rest_framework import serializers
from account.serializers import MeSerializer

from . import models


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'


class PackageOrder(serializers.ModelSerializer):
    class Meta:
        model = models.PackageOrder
        fields = '__all__'

class OrderHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderHistory
        fields = '__all__'
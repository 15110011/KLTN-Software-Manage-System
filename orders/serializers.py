from rest_framework import serializers
from account.serializers import MeSerializer
from contacts.serializers import ContactSerializer, NoteSerializer
from packages.serializers import PackageSerializer

from . import models


class OrderSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer()
    sale_rep = MeSerializer()
    note = NoteSerializer()
    packages = PackageSerializer(many=True)

    class Meta:
        model = models.Order
        fields = '__all__'


class CreateOrderSerialzier(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'


class PackageOrderSerialzier(serializers.ModelSerializer):
    class Meta:
        model = models.PackageOrder
        fields = '__all__'


class OrderHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderHistory
        fields = '__all__'

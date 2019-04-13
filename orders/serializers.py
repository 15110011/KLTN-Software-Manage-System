from rest_framework import serializers
from account.serializers import MeSerializer
from contacts.serializers import ContactSerializer, NoteSerializer
from packages.serializers import PackageSerializer
from steps.serializers import StepDetailWithoutOrderSerializer
from steps.models import StepDetail

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
    step_details = StepDetailWithoutOrderSerializer(many=True)

    class Meta:
        model = models.Order
        fields = '__all__'

    def create(self, validated_data):
        step_details = validated_data.pop('step_details')
        order = super().create(validated_data)
        step_details = [StepDetail(**item, order=order)
                        for item in step_details]
        step_details = StepDetail.objects.bulk_create(step_details)
        return order


class OrderHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderHistory
        fields = '__all__'

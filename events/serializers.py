from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Event
from campaigns.models import ContactMarketing
from contacts.serializers import ContactWithoutGroupSerializer
from campaigns.serializers import ContactMarketingSerializer

from datetime import datetime


class EventReadSerializer(serializers.ModelSerializer):

    contacts = ContactWithoutGroupSerializer(many=True)
    marketing = ContactMarketingSerializer()
    remaining = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def update(self, instance, validated_data):
        marketing = validated_data.pop('marketing', None)
        super().update(instance, validated_data)
        if marketing:
            status = marketing.get('status', None)
            if status:
                instance.marketing.status = marketing['status']
            instance.marketing.save()

        return instance

    def get_remaining(self, instance):

        return (instance.end_date - datetime.now().date()).days


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'

from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Event
from campaigns.models import ContactMarketing
from orders.models import Order
from contacts.models import Contact
from contacts.serializers import ContactWithoutGroupSerializer
from campaigns.serializers import ContactMarketingSerializer

from datetime import datetime


class EventReadSerializer(serializers.ModelSerializer):

    contacts = ContactWithoutGroupSerializer(many=True)
    marketing = ContactMarketingSerializer()
    assigned_to = serializers.HiddenField(
        default=serializers.CurrentUserDefault())
    # order = ContactMarketingSerializer()
    remaining = serializers.SerializerMethodField()
    is_overdue = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def update(self, instance, validated_data):
        sale_rep = self.context.get('request').user
        marketing = validated_data.pop('marketing', None)
        contacts = validated_data.pop('contacts', None)

        super().update(instance, validated_data)
        if marketing:
            status = marketing.get('status', None)
            if status:
                instance.marketing.status = marketing['status']
                if status == 'COMPLETED':
                    for c in contacts:
                        new_order = Order.objects.create(
                            contacts=Contact.objects.get(id=c['id']), sale_rep=sale_rep)
            instance.marketing.save()

        return instance

    def get_remaining(self, instance):

        return (instance.end_date - datetime.now().date()).days

    def get_is_overdue(self, instance):
        return (instance.end_date - datetime.now().date()).days < 0


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'

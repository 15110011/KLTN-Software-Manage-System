from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.fields import set_value
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
        print(instance.end_date,datetime.now().date(), (instance.end_date.date() - datetime.now().date()).days)
        return (instance.end_date.date() - datetime.now().date()).days

    def get_is_overdue(self, instance):
        return (instance.end_date.date() - datetime.now().date()).days < 0


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'

    def create(self, validated_data):
        type_ = validated_data.pop('type_', None)
        campaign = validated_data.pop( 'campaign', None )
        if type_ == 'campaign':
            for c in validated_data['contacts']:
                try:
                    cur_contact_marketing = ContactMarketing.objects.filter(contact=c).filter(
                        campaign=int(campaign))[0]
                    if cur_contact_marketing.status == 'COMPLETED':
                        cur_order = Order.objects.filter(contact=c).filter(
                            campaign=int(campaign))[0]

                        validated_data['order'] = Order.objects.get(id=cur_order.id)
                    else:
                        validated_data['marketing'] = ContactMarketing.objects.get(id=cur_contact_marketing.id)
                except:
                    pass
        instance = super().create(validated_data)

        return instance

    def to_internal_value(self, data):
        ret = super().to_internal_value(data)
        set_value(ret, ['type_'], data['type_'])
        if data['type_'] == 'campaign':
            set_value(ret, ['campaign'], data['campaign'])

        return ret

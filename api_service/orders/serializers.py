from django.forms.models import model_to_dict
from rest_framework import serializers

from account.serializers import MeSerializer
from contacts.serializers import ContactSerializer
from packages.serializers import PackageSerializer
from steps.serializers import StepDetailWithoutOrderSerializer
from steps.models import StepDetail
from campaigns.serializers import CampaignSerializer
from . import models
from KLTN.common import send_email
from django.contrib.auth.models import User
import django_rq
from datetime import datetime, timedelta, timezone
import calendar


class OrderHistorySerializer(serializers.ModelSerializer):
    campaign = serializers.SerializerMethodField()

    class Meta:
        model = models.OrderHistory
        fields = '__all__'

    def get_campaign(self, instance):
        cur_campaign = instance.order.campaign
        return {"name": cur_campaign.name, "id": cur_campaign.id}


class CreateLicenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.License
        fields = '__all__'

    def create(self, validated_data):
        license = super().create(validated_data)
        scheduler = django_rq.get_scheduler('default')
        user = User.objects.get(username=self.context.get('request').user)
        remind_date = license.start_date + \
            timedelta(days=license.duration*30) - timedelta(days=10)
        timestamp1 = calendar.timegm((remind_date).timetuple())
        start_date = datetime.utcfromtimestamp(timestamp1)
        scheduler.enqueue_at(start_date, send_email, user,
                             'License Reminder', 'Your license will be expired in 10 days')
        return license


class LicenseSerializer(serializers.ModelSerializer):
    package = PackageSerializer()
    month_group = serializers.IntegerField(required=False)

    class Meta:
        model = models.License
        fields = '__all__'


class CreateLifetimeLicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LifetimeLicense
        fields = '__all__'


class LifetimeLicenseSerializer(serializers.ModelSerializer):
    package = PackageSerializer()
    month_group = serializers.IntegerField(required=False)

    class Meta:
        model = models.LifetimeLicense
        fields = '__all__'


class OrderChartSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer()
    sale_rep = MeSerializer()
    packages = PackageSerializer(many=True)
    campaign = CampaignSerializer()
    step_details = StepDetailWithoutOrderSerializer(many=True)
    history = OrderHistorySerializer(many=True)
    licenses = LicenseSerializer(many=True)
    lifetime_licenses = LifetimeLicenseSerializer(many=True)
    amount = serializers.IntegerField(required=False)
    month_group = serializers.IntegerField()

    # order_packages = Order

    class Meta:
        model = models.Order
        fields = '__all__'

    # def get_month_group(self, instance):
    #     return instance.created.month


class OrderSaleRepChartSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer()
    sale_rep = MeSerializer()
    packages = PackageSerializer(many=True)
    campaign = CampaignSerializer()
    step_details = StepDetailWithoutOrderSerializer(many=True)
    history = OrderHistorySerializer(many=True)
    licenses = LicenseSerializer(many=True)
    lifetime_licenses = LifetimeLicenseSerializer(many=True)

    # order_packages = Order

    class Meta:
        model = models.Order
        fields = '__all__'


class ReportOrderSerializer(serializers.ModelSerializer):
    sale_rep = MeSerializer()
    packages = PackageSerializer(many=True)
    campaign = CampaignSerializer()
    contacts = ContactSerializer()

    class Meta:
        model = models.Order
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer()
    sale_rep = MeSerializer()
    packages = PackageSerializer(many=True)
    campaign = CampaignSerializer()
    step_details = StepDetailWithoutOrderSerializer(many=True)
    history = OrderHistorySerializer(many=True)
    all_histories = serializers.SerializerMethodField()
    licenses = LicenseSerializer(many=True)
    lifetime_licenses = LifetimeLicenseSerializer(many=True)

    # order_packages = Order

    class Meta:
        model = models.Order
        fields = '__all__'

    def get_all_histories(self, instance):
        cur_contact = instance.contacts
        histories = models.OrderHistory.objects.filter(
            order__contacts=cur_contact)
        serializer = OrderHistorySerializer(histories, many=True)

        return serializer.data


class CreateOrderSerialzier(serializers.ModelSerializer):
    # step_details = StepDetailWithoutOrderSerializer(many=True)

    class Meta:
        model = models.Order
        fields = '__all__'

    def create(self, validated_data):
        # step_details = validated_data.pop('step_details')
        order = super().create(validated_data)
        step_details = [StepDetail(step=s, order=order, information={})
                        for s in order.campaign.follow_up_plan.steps.all()]
        step_details = StepDetail.objects.bulk_create(step_details)
        return order

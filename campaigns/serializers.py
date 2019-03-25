from rest_framework import serializers
from account.serializers import MeSerializer

from . import models


class MarketingPlanSerialier(serializers.ModelSerializer):
    class Meta:
        model = models.MarketingPlan
        fields = '__all__'


class FollowUpPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FollowUpPlan
        fields = '__all__'


class CampaignSerializer(serializers.ModelSerializer):
    follow_up_plan = FollowUpPlanSerializer()
    marketing_plan = MarketingPlanSerialier()
    manager = MeSerializer()

    class Meta:
        model = models.Campaign
        fields = '__all__'

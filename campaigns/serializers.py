from rest_framework import serializers
from account.serializers import MeSerializer
from steps.serializers import StepSerialzier, StepWithOutFollowUpSerializer
from steps.models import Step

from . import models


class MarketingPlanSerialier(serializers.ModelSerializer):
    class Meta:
        model = models.MarketingPlan
        fields = '__all__'


class FollowUpPlanSerializer(serializers.ModelSerializer):
    steps = StepWithOutFollowUpSerializer(many=True)
    class Meta:
        model = models.FollowUpPlan
        fields = '__all__'


class CreateFollowUpPlanSerializer(serializers.ModelSerializer):
    steps = StepWithOutFollowUpSerializer(many=True)

    class Meta:
        model = models.FollowUpPlan
        fields = '__all__'

    def create(self, validated_data):
        steps = validated_data.pop('steps')
        followup_plan = super().create(validated_data)
        steps = [Step(**item, follow_up=followup_plan) for item in steps]
        steps = Step.objects.bulk_create(steps)
        return followup_plan


class CampaignSerializer(serializers.ModelSerializer):
    follow_up_plan = FollowUpPlanSerializer()
    marketing_plan = MarketingPlanSerialier()
    manager = MeSerializer()

    class Meta:
        model = models.Campaign
        fields = '__all__'


class CreateCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Campaign
        fields = '__all__'

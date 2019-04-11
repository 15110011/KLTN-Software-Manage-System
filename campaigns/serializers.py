from rest_framework import serializers
from account.serializers import MeSerializer
from steps.serializers import StepSerialzier, StepWithOutFollowUpSerializer
from steps.models import Step
from contacts.models import Contact

from . import models


class MarketingPlanSerialier(serializers.ModelSerializer):
    class Meta:
        model = models.MarketingPlan
        fields = '__all__'


class CreateMarketingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MarketingPlan
        exclude= ['contacts']

    def create(self, validated_data):
        marketing_plan = super().create(validated_data)
        return marketing_plan

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

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        steps = validated_data.get('steps')
        if steps is not None:
            for item in steps:
                try:
                    step_id = item['id']
                    step = Step.objects.get(id=step_id)
                    step.actions = item.get('actions', step.actions)
                    step.duration = item.get('duration', step.duration)
                    step.conditions = item.get('conditions', step.conditions)
                    step.save()
                except:
                    step = Step(**step)
                    step.save()
        return instance


class CampaignSerializer(serializers.ModelSerializer):
    follow_up_plan = FollowUpPlanSerializer()
    marketing_plan = MarketingPlanSerialier()
    manager = MeSerializer()

    class Meta:
        model = models.Campaign
        fields = '__all__'


class CreateCampaignSerializer(serializers.ModelSerializer):
    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.Campaign
        fields = '__all__'


class ContactMarketingSerializer(serializers.ModelSerializer):
    marketing_plan = MarketingPlanSerialier()

    class Meta:
        model = models.ContactMarketing
        fields = '__all__'
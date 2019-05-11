from rest_framework import serializers
from django.forms.models import model_to_dict
from .models import Step, StepDetail
import django_rq
from datetime import datetime, timedelta, timezone
import calendar
from KLTN.common import send_email


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = '__all__'

    def create(self, validated_data):
        steps = super().create(validated_data)
        return steps


class StepDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepDetail
        fields = '__all__'

    def update(self, instance, validated_data):
        step_detail = super().update(instance, validated_data)
        status = validated_data.get('status', None)
        if status is not None:
            if status == 'COMPLETED':
                steps = instance.order.campaign.follow_up_plan.steps.all()
                for index, step in enumerate(steps):
                    if step.id == instance.step.id:
                        if index + 1 >= len(steps):
                            break
                        queue = django_rq.get_queue('default', is_async=True)
                        queue.enqueue(send_email, self.context.get(
                            'request').user, 'Step', step[index+1].mail_template)
                        break
        return step_detail


class StepWithOutFollowUpSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    email_template_ = serializers.SerializerMethodField()

    class Meta:
        model = Step
        exclude = ['follow_up']

    def get_email_template_(self, instance):
        if instance.mail_template:
            return model_to_dict(instance.mail_template)
        return None


class StepDetailWithoutOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepDetail
        exclude = ['order']

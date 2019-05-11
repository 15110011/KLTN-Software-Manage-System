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
        scheduler = django_rq.get_scheduler('default')
        job = scheduler.schedule(
            scheduled_time=datetime.utcnow(),
            func=send_email,
            args=[self.context.get('request').user, 'Step', 'Your Step started today'],
            interval=604800,
            kwargs={},
            repeat=10,
        )
        return steps

class StepDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepDetail
        fields = '__all__'

    def update(self, instance, validated_data):
        step_detail = super().update(instance, validated_data)
        
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

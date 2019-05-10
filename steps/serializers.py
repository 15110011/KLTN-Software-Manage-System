from rest_framework import serializers
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


class StepWithOutFollowUpSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Step
        exclude = ['follow_up']


class StepDetailWithoutOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepDetail
        exclude = ['order']

from rest_framework import serializers
from .models import Step, StepDetail


class StepSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = '__all__'


class StepDetailSerialzier(serializers.ModelSerializer):
    class Meta:
        model = StepDetail
        fields = '__all__'


class StepWithOutFollowUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        exclude = ['follow_up']

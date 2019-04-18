from rest_framework import serializers
from .models import Step, StepDetail


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = '__all__'


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

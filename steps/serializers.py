from rest_framework import serializers
from django.forms.models import model_to_dict
from .models import Step, StepDetail


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = '__all__'


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

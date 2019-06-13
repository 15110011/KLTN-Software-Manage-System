from rest_framework import serializers
from django.forms.models import model_to_dict
from .models import Step, StepDetail
import django_rq
from datetime import datetime, timedelta, timezone
import calendar
from KLTN.common import send_email
from campaigns import handle_mail_template

import json
import requests


def send_email_api(user, to_address, from_address, subject, message, step_detail_id):
    data = json.dumps({"data": {"user_id": user.id, "to": to_address, "from": from_address,
                                "subject": subject, "message": message}})
    request = requests.post('http://emails:8001/api/v1/send-email',
                            data=data, headers={'Content-Type': 'application/json'})
    res = request.json()
    # try:
    step_detail = StepDetail.objects.get(id=step_detail_id)
    step_detail.thread.append(
        {'thread_id': res['thread_id'], 'type': 'Send Email'})
    step_detail.save()
    # except:
    #    pass


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
                        if "Send Email" in steps[index+1].actions:
                            cur_contact = step_detail.order.contacts
                            queue = django_rq.get_queue(
                                'default', is_async=True)
                            queue.enqueue(send_email_api, self.context.get(
                                'request').user, cur_contact.mail, "theaqvteam@gmail.com", steps[index+1].mail_template.subject, handle_mail_template.manipulate_template(steps[index+1].mail_template.template, contact=cur_contact, packages=step_detail.order.campaign.packages.all()), step_detail.id+1)
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

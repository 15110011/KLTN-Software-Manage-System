from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from KLTN.models import BaseModel
from campaigns.models import FollowUpPlan


class Step(BaseModel):
    follow_up = models.ForeignKey(
        FollowUpPlan, on_delete=models.CASCADE, related_name='steps')
    nth = models.IntegerField()
    action = models.TextField()
    duration = models.IntegerField()
    conditions = JSONField()


class StepDetail(BaseModel):
    step = models.ForeignKey(
        Step, on_delete=models.CASCADE, related_name='step_detail')
    order = models.ForeignKey(
        'orders.Order', on_delete=models.CASCADE, related_name='step_details')
    information = JSONField()
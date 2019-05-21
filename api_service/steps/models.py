from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField, ArrayField
from KLTN.models import BaseModel
from campaigns.models import FollowUpPlan

STEP_STATUS_CHOICES = (('RUNNING', 'Running'), ('COMPLETED', 'Completed'),)


class Step(BaseModel):
    follow_up = models.ForeignKey(
        FollowUpPlan, on_delete=models.CASCADE, related_name='steps')
    # nth = models.IntegerField()
    actions = JSONField(default=list([]))
    duration = models.IntegerField()
    conditions = JSONField(blank=True, null=True)
    mail_template = models.ForeignKey(
        'campaigns.MailTemplate', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ('id',)


class StepDetail(BaseModel):
    step = models.ForeignKey(
        Step, on_delete=models.CASCADE, related_name='step_detail', null=True)
    order = models.ForeignKey(
        'orders.Order', on_delete=models.CASCADE, related_name='step_details')
    information = JSONField(blank=True, null=True)
    status = models.CharField(
        max_length=50, choices=STEP_STATUS_CHOICES, default='RUNNING')
    thread_id = ArrayField(base_field=models.CharField(
        max_length=255, null=True, blank=True), null=True, blank=True)

    class Meta:
        ordering = ('id',)

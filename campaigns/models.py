from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from KLTN.models import BaseModel
# Create your models here.

class MailTemplate(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mail_templates')
    name = models.CharField(max_length=255)
    template = models.TextField()

class MarketingPlan(BaseModel):
    name = models.CharField(max_length=255)
    condition = JSONField()
    actions = JSONField()
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='marketing_plan')


class FollowUpPlan(BaseModel):
    name = models.CharField(max_length=255)
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='follow_up_plan')


class Campaign(BaseModel):
    follow_up_plan = models.ForeignKey(
        FollowUpPlan, on_delete=models.CASCADE, related_name='campaigns')
    marketing_plan = models.ForeignKey(
        MarketingPlan, on_delete=models.CASCADE, related_name='campaigns')
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='campaigns')
    name = models.CharField(max_length=255)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(auto_now_add=True)
    desc = models.TextField()
    mail_template = models.ForeignKey(MailTemplate, on_delete=models.SET_NULL, related_name="campaigns", blank=True, null=True)

from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from KLTN.models import BaseModel
# Create your models here.


class MarketingPlan(BaseModel):
    name = models.CharField(max_length=255)
    condition = JSONField()
    actions = JSONField()
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='marketing_plan')

    def _get_plan_name(self):
        return f'{self.name}'
    
    def _get_manager_plan(self):
        return self.manager.id


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

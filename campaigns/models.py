from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField, ArrayField
from KLTN.models import BaseModel
from KLTN.common import PRIORITY_CHOICES
from contacts.models import Contact

# Create your models here.



class MailTemplate(BaseModel):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='mail_templates')
    name = models.CharField(max_length=255)
    template = models.TextField()


class MarketingPlan(BaseModel):
    name = models.CharField(max_length=255)
    condition = JSONField()
    actions = ArrayField(models.CharField(max_length=10, blank=True),
                         size=8, default=list)
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='marketing_plan')
    contacts = models.ManyToManyField(
        Contact,
        related_name='marketing_plans',
        through='ContactMarketing',
        through_fields=('marketing_plan', 'contact'),
    )

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
    start_date = models.DateField()
    end_date = models.DateField()
    desc = models.TextField()
    mail_template = models.ForeignKey(
        MailTemplate, on_delete=models.SET_NULL, related_name="campaigns", blank=True, null=True)


CONTACT_MARKETING_CHOICE = (
    ('FAILED', 'Failed'),
    ('RUNNING', 'Running'),
    ('COMPLETED', 'Completed')
)

class ContactMarketing(BaseModel):
    marketing_plan = models.ForeignKey(MarketingPlan, on_delete=models.CASCADE)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    campaign = models.ForeignKey(
        Campaign, related_name='contact_marketing_plan', on_delete=models.CASCADE)
    status = models.TextField(choices=CONTACT_MARKETING_CHOICE, default="RUNNING")
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=2)


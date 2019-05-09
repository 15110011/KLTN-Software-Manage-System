from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField, ArrayField
from KLTN.models import BaseModel
from KLTN.common import PRIORITY_CHOICES, NOTE_CHOICES
from contacts.models import Contact
from packages.models import Package

# Create your models here.


class MailTemplate(BaseModel):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='mail_templates')
    name = models.CharField(max_length=255)
    template = models.TextField()
    is_public = models.BooleanField(default=False)


class MarketingPlan(BaseModel):
    name = models.CharField(max_length=255)
    condition = JSONField()
    actions = ArrayField(models.CharField(max_length=50, blank=True),
                         size=8, default=list)
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='marketing_plan')
    mail_template = models.ForeignKey(
        MailTemplate, on_delete=models.SET_NULL, related_name="marketing_plans", blank=True, null=True)
    # contacts = models.ManyToManyField(
    #     Contact,
    #     related_name='marketing_plans',
    #     through='ContactMarketing',
    #     through_fields=('marketing_plan', 'contact'),
    # )
    can_modify = models.BooleanField(default=True)

    def _get_plan_name(self):
        return f'{self.name}'

    def _get_manager_plan(self):
        return self.manager.id


class FollowUpPlan(BaseModel):
    name = models.CharField(max_length=255)
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='follow_up_plan')
    can_modify = models.BooleanField(default=True)


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
    assigned_to = models.ManyToManyField(
        User, related_name='sale_reps_campaign')
    desc = models.TextField()
    packages = models.ManyToManyField(
        Package, related_name='campaigns', blank=True)

    def _get_manager_campaign(self):
        return self.manager.id

    def _get_campaign_name(self):
        return f'{self.name}'


CONTACT_MARKETING_CHOICE = (
    ('FAILED', 'Failed'),
    ('RUNNING', 'Running'),
    ('COMPLETED', 'Completed'),
    ('OVERDUE', 'Overdue')
)


class ContactMarketing(BaseModel):
    marketing_plan = models.ForeignKey(MarketingPlan, on_delete=models.CASCADE)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    campaign = models.ForeignKey(
        Campaign, related_name='contact_marketing_plan', on_delete=models.CASCADE)
    status = models.TextField(
        choices=CONTACT_MARKETING_CHOICE, default="RUNNING")
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=2)

    class Meta:
        unique_together = (('campaign', 'contact'),)


class ContactMarketingHistory(BaseModel):

    contact_marketing = models.ForeignKey(
        ContactMarketing, on_delete=models.CASCADE, related_name="histories")
    action = models.CharField(max_length=20)

    class Meta:
        ordering = ('-created',)


class Note(BaseModel):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='notes')
    contact = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name='notes')
    campaign = models.ForeignKey(
        Campaign, on_delete=models.CASCADE, related_name='notes', blank=True, null=True)
    name = models.TextField()
    content = models.TextField(blank=True, null=True)
    _type = models.CharField(
        max_length=20, choices=NOTE_CHOICES, default="Default")

    class Meta:
        unique_together = (("campaign", "_type", "contact"),)

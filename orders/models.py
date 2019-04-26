from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from KLTN.models import BaseModel
from contacts.models import Contact
from packages.models import Package
from steps.models import StepDetail
from campaigns.models import Campaign
# Create your models here.
import uuid

ORDER_CHOICES = (
    ('FAILED', 'Failed'),
    ('RUNNING', 'Running'),
    ('COMPLETED', 'COMPLETED'),
    ('OVERDUE', 'Overdue')
)


class Order(BaseModel):
    contacts = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name='orders')
    sale_rep = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='orders')
    campaign = models.ForeignKey(
        Campaign, on_delete=models.CASCADE, related_name='orders', null=True, blank=True)
    name = models.CharField(max_length=255)
    status = models.CharField(
        max_length=100, choices=ORDER_CHOICES, default='RUNNING')
    packages = models.ManyToManyField(Package, related_name='orders')


class OrderHistory(BaseModel):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='history')
    step_detail = models.ForeignKey(
        StepDetail, on_delete=models.CASCADE, related_name='order_history')
    date = models.DateField(auto_now_add=True)
    action = models.TextField()


class License(BaseModel):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='licenses')
    start_date = models.DateField()
    duration = models.IntegerField()
    code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)


class LifetimeLicense(BaseModel):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='lifetime_licenses')
    start_date = models.DateField()
    code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

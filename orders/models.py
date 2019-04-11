from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from KLTN.models import BaseModel
from contacts.models import Contact, Note
from packages.models import Package
from steps.models import StepDetail
# Create your models here.

ORDER_CHOICES = (
    ('FAILED', 'Failed'),
    ('RUNNING', 'Running'),
    ('COMPLETED', 'COMPLETED')
)


class Order(BaseModel):
    contacts = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name='orders')
    sale_rep = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='orders')
    note = models.ForeignKey(
        Note, on_delete=models.CASCADE, related_name='orders', null=True)
    name = models.CharField(max_length=255)
    status = models.CharField(
        max_length=100, choices=ORDER_CHOICES, default='RUNNING')
    packages = models.ManyToManyField(
        Package, through='PackageOrder', related_name='orders')


class PackageOrder(BaseModel):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    duration = models.CharField(max_length=100)


class OrderHistory(BaseModel):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='history')
    step_detail = models.ForeignKey(
        StepDetail, on_delete=models.CASCADE, related_name='order_history')
    date = models.DateField(auto_now_add=True)
    action = models.TextField()

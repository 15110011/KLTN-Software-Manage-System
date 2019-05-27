from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField, ArrayField
from KLTN.models import BaseModel
from packages.models import Package, Product


class Report(BaseModel):
    name = models.CharField(max_length=255)
    columns = JSONField()
    users = models.ManyToManyField(User, related_name='reports')
    packages = models.ManyToManyField(Package, related_name='reports')
    products = models.ManyToManyField(Product, related_name='reports')
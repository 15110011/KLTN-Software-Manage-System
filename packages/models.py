from django.db import models
from django.contrib.auth.models import User
from KLTN.models import BaseModel

PRODUCT_CHOICES = (
    ('ACTIVE', 'ACTIVE'),
    ('INACTIVE', 'INACTIVE')
)
# Create your models here.


class Product(BaseModel):
    name = models.CharField(max_length=255)
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='products')
    description = models.TextField()
    status = models.TextField(choices=PRODUCT_CHOICES, default='ACTIVE')


class Package(BaseModel):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    discount = models.IntegerField()
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='package')
    types = models.TextField(max_length=255)
    products = models.ManyToManyField(
        Product, related_name='packages')

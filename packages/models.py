from django.db import models
from django.contrib.auth.models import User
from KLTN.models import BaseModel

PRODUCT_CHOICES = (
    ('ACTIVE', 'Active'),
    ('INACTIVE', 'Inactive')
)
# Create your models here.


class Product(BaseModel):
    name = models.CharField(max_length=255)
    manager = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='products')
    desc = models.TextField()
    status = models.TextField(choices=PRODUCT_CHOICES, default='ACTIVE')
    start_sale_date = models.DateField(auto_now_add=True)
    start_support_date = models.DateField(auto_now_add=True)


class Feature(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="features")
    name = models.CharField(max_length=255)
    desc = models.TextField()
    price = models.IntegerField()


class Package(BaseModel):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    discount = models.IntegerField()
    features = models.ManyToManyField(
        Feature, related_name="packages")

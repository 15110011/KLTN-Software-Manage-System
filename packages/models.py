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
    description = models.TextField()
    status = models.TextField(choices=PRODUCT_CHOICES, default='ACTIVE')
    start_sale_date = models.DateField(auto_now_add=True)
    start_support_date = models.DateField(auto_now_add=True)


class Package(BaseModel):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    discount = models.IntegerField()
    types = models.TextField(max_length=255)
    products = models.ManyToManyField(
        Product, related_name='packages', blank=True)


class PackageHistory(BaseModel):
    package = models.ForeignKey(
        Package, on_delete=models.CASCADE, related_name='package_history')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='package_history')
    date = models.DateField(auto_now_add=True)
    action = models.TextField()
    
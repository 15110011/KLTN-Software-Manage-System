from django.db import models

from django.contrib.auth.models import User

from django.contrib.postgres.fields import JSONField

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

    def _get_product_name(self):
        return f'{self.name}'


class Feature(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="features")
    name = models.CharField(max_length=255)
    desc = models.TextField()
    price = models.IntegerField()
    number = models.IntegerField()  

class Package(BaseModel):
    name = models.CharField(max_length=255)
    prices = JSONField()
    discount = models.IntegerField(blank= True, null=True)
    features = models.ManyToManyField(
        Feature, related_name="packages")

class PackageHistory(BaseModel):
    package = models.ForeignKey(
        Package, on_delete=models.CASCADE, related_name='package_history')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='package_history')
    date = models.DateField(auto_now_add=True)
    action = models.TextField()
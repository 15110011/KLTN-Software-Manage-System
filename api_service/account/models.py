from django.db import models
from django.contrib.auth.models import User
from KLTN.models import BaseModel

# Create your models here.

class Profile (BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    # manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sale_reps', null=True, blank=True)
    is_manager = models.BooleanField()
    phone = models.TextField(max_length=15)
    company_name = models.TextField(max_length=100)
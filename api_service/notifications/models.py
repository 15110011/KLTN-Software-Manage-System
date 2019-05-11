from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField, ArrayField
from KLTN.models import BaseModel
# Create your models here.

class Notification(BaseModel):
    content = models.TextField()
    link = models.URLField(max_length=255)
    avatar = models.URLField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_seen = models.BooleanField(default=False)
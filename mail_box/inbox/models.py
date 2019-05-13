from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class MailBox(models.Model):
    user_id = models.CharField(max_length=255)
    email_id = models.CharField(max_length=255)
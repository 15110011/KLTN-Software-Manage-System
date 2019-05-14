from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class MailBox(models.Model):
    user_id = models.CharField(max_length=255)
    message_id = models.CharField(max_length=255)
    message_history = models.CharField(max_length=255)
    thread_id = models.CharField(max_length=255)

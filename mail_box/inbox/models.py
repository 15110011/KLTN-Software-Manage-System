from django.db import models
from django.contrib.auth.models import User
from config.base_models import BaseModel
# Create your models here.


class MailBox(BaseModel):
    user_id = models.CharField(max_length=255)
    message_id = models.CharField(max_length=255)
    thread_id = models.CharField(max_length=255)

class MailHistory(BaseModel):
    history_id = models.CharField(max_length=255)
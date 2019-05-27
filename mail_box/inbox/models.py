from django.db import models
from django.contrib.auth.models import User
from config.base_models import BaseModel
# Create your models here.

EMAIL_TYPE = (
    ('SENT', 'SENT'),
    ('INBOX', 'INBOX'),
    
)

class MailBox(BaseModel):
    user_id = models.CharField(max_length=255)
    message_id = models.CharField(max_length=255)
    thread_id = models.CharField(max_length=255)
    email_type = models.CharField(max_length=20, choices=EMAIL_TYPE)

class MailHistory(BaseModel):
    history_id = models.CharField(max_length=255)
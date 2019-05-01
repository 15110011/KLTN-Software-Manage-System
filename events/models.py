from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField, ArrayField
from KLTN.models import BaseModel
from KLTN.common import PRIORITY_CHOICES
from orders.models import Order
from campaigns.models import ContactMarketing
from contacts.models import Contact


class Event(BaseModel):
    user = models.ForeignKey(
        User, related_name='events', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(
        User, related_name='user_events', on_delete=models.CASCADE)
    order = models.ForeignKey(
        Order, related_name='events', on_delete=models.CASCADE, blank=True, null=True)
    marketing = models.ForeignKey(
        ContactMarketing, related_name='events', on_delete=models.CASCADE, blank=True, null=True)
    content = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    name = models.CharField(max_length=255)
    # action = models.TextField(blank=True, null=True)
    contacts = models.ManyToManyField(Contact, related_name='contact_events')
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=0)

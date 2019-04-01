from django.db import models
from django.contrib.auth.models import User
from KLTN.models import BaseModel
# Create your models here.

SEX_CHOICES = (('MALE', 'Male'), ('FEMALE', 'Female'), ('OTHER', 'Other'))


class Contact(BaseModel):

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    mail = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    address = models.CharField(max_length=15, null=True, blank=True)
    country = models.CharField(max_length=15, null=True, blank=True)
    zipcode = models.IntegerField(null=True, blank=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='contacts')

    def _get_fullname(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        unique_together = (("user", "first_name", "last_name"),)


class ContactGroup(BaseModel):

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='contact_groups')
    name = models.CharField(max_length=100)
    contacts = models.ManyToManyField(
        Contact, related_name='groups', blank=True)

    class Meta:
        unique_together = (("user", "name"),)


class Note(BaseModel):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='notes')
    contact = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name='notes')
    name = models.CharField(max_length=255)
    content = models.TextField()

from django.db import models
from django.db.models import UniqueConstraint, Q
from django.contrib.auth.models import User
from KLTN.models import BaseModel

SEX_CHOICES = (('MALE', 'Male'), ('FEMALE', 'Female'), ('OTHER', 'Other'))


class Contact(BaseModel):

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    mail = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    address = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    zipcode = models.CharField(max_length=10, null=True, blank=True)
    org = models.TextField(null=True, blank=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='contacts')

    def _get_fullname(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        constraints = [UniqueConstraint(
            fields=["user", "first_name", "last_name"], condition=Q(is_removed=False), name='contact_unique')]


GROUP_TYPES = (
    ('PUBLIC', 'PUBLIC'),
    ('PRIVATE', 'PRIVATE')
)


class ContactGroup(BaseModel):

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='contact_groups')
    editor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cant_edit_contact_groups',
                               null=True, blank=True)
    name = models.CharField(max_length=100)
    _type = models.CharField(
        max_length=20, choices=GROUP_TYPES, default='PRIVATE')
    contacts = models.ManyToManyField(
        Contact, related_name='groups', blank=True)

    class Meta:
        unique_together = (("user", "name"),)

from django.contrib import admin
from . import models

@admin.register(models.Contact)
class ContactAdmin(admin.ModelAdmin):
    pass

@admin.register(models.ContactGroup)
class ContactGroupAdmin(admin.ModelAdmin):
    pass
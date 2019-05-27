from django.contrib import admin
from .models import MailBox
# Register your models here.
@admin.register(MailBox)
class MailBoxAdmin(admin.ModelAdmin):
    pass

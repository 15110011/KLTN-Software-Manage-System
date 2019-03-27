from django.contrib import admin
from .models import Contact, ContactGroup, Note


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    pass    

@admin.register(ContactGroup)
class ContactGroupAdmin(admin.ModelAdmin):
    pass    

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    pass
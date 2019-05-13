from django.contrib import admin
from .models import Step, StepDetail


@admin.register(Step)
class StepAdmin(admin.ModelAdmin):
    pass    

@admin.register(StepDetail)
class StepDetailAdmin(admin.ModelAdmin):
    pass    

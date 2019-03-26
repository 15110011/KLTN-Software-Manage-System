from django.contrib import admin
from .models import MarketingPlan, Campaign, FollowUpPlan


# Register your models here.
@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    pass


@admin.register(MarketingPlan)
class MarketingPlanAdmin(admin.ModelAdmin):
    pass


@admin.register(FollowUpPlan)
class FollowUpPlanAdmin(admin.ModelAdmin):
    pass

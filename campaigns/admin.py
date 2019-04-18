from django.contrib import admin
from .models import MarketingPlan, Campaign, FollowUpPlan, ContactMarketing, ContactMarketingHistory, Note


# Register your models here.
@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    pass


@admin.register(MarketingPlan)
class MarketingPlanAdmin(admin.ModelAdmin):
    pass


@admin.register(ContactMarketingHistory)
class ContactMarketingHistoryAdmin(admin.ModelAdmin):
    pass


@admin.register(ContactMarketing)
class ContactMarketingAdmin(admin.ModelAdmin):
    pass


@admin.register(FollowUpPlan)
class FollowUpPlanAdmin(admin.ModelAdmin):
    pass


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    pass

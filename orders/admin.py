from django.contrib import admin
from .models import Order, OrderHistory, License, LifetimeLicense


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass    

@admin.register(OrderHistory)
class OrderHistoryAdmin(admin.ModelAdmin):
    pass    

@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    pass    

@admin.register(LifetimeLicense)
class LifetimeLicenseAdmin(admin.ModelAdmin):
    pass    


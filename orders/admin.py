from django.contrib import admin
from .models import Order, OrderHistory, PackageOrder


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass    

@admin.register(OrderHistory)
class OrderHistoryAdmin(admin.ModelAdmin):
    pass    

@admin.register(PackageOrder)
class PackageOrderAdmin(admin.ModelAdmin):
    pass
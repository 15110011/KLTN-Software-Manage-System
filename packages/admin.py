from django.contrib import admin
from .models import Product, Package, Feature


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    pass    

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass    

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    pass
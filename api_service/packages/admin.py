from django.contrib import admin
from .models import Product, Package, Feature, ProductCategory, ProductType


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    pass


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(ProductCategory)
class ProductCategory(admin.ModelAdmin):
    pass

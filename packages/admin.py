from django.contrib import admin
from .models import Product, Package


# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass    

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    pass
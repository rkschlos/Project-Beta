from django.contrib import admin

# Register your models here.
from .models import SalesPerson

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass
from django.contrib import admin

from .models import AutomobileVO, Technician, ServiceAppointment

# Register your models here.

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(ServiceAppointment)
class ServiceAppointmentAdmin(admin.ModelAdmin):
    pass
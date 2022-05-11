from django.urls import path
from .views import api_appointments_list, api_technicians, api_appointments, api_delete_technician

urlpatterns = [
    path("service/", api_appointments_list, name="api_appointments_list"),
    path("service/<int:pk>/", api_appointments, name="api_appointments"),
    path("service/new", api_appointments_list, name="create_appointment"),
    path("technicians/new", api_technicians, name="api_create_technician"),
    path("technicians/", api_technicians, name="api_technicians_list"),
    path("technicians/<int:pk>/", api_delete_technician, name="api_delete_technician")


]

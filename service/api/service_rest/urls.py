from django.urls import path
from .views import api_appointments_list, api_technicians, api_appointments

urlpatterns = [
    path("service/", api_appointments_list, name="api_appointments_list"),
    path("service/<int:pk>/", api_appointments, name="api_appointments"),
    path("technicians/new", api_technicians, name="api_create_technician"),
    path("technicians/", api_technicians, name="api_technicians_list"),


]

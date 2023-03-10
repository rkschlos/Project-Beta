from django.urls import path
from .views import api_appointments_list, api_show_appointment, api_technicians, api_delete_technician

urlpatterns = [
    path("service/", api_appointments_list, name="api_appointments_list"),
    path("service/new", api_appointments_list, name="create_appointment"),
    path("service/<int:pk>/", api_show_appointment, name="api_show_appointment"),
    path("technicians/new", api_technicians, name="api_create_technician"),
    path("technicians/", api_technicians, name="api_technicians_list"),
    path("technicians/<int:pk>/", api_delete_technician, name="api_delete_technician")


]

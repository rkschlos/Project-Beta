from django.urls import path

from .views import (
    api_salespersons,
)

urlpatterns = [
    path("salespersons/", api_salespersons, name= "api_salespersons",),
]
from django.urls import path

from .views import (
    api_salespersons,
    api_customers,
)

urlpatterns = [
    path("salespersons/", api_salespersons, name= "api_salespersons",),
    path("customers/", api_customers, name="api_customers")
]
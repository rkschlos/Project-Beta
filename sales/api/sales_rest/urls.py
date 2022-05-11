from django.urls import path

from .views import (
    api_salespersons,
    api_customers,
    api_salerecords, 
)

urlpatterns = [
    path("salespersons/", api_salespersons, name= "api_salespersons",),
    path("customers/", api_customers, name="api_customers",),
    path("salerecords/", api_salerecords, name="api_salerecords"),
]
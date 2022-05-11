from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder


from .models import SalesPerson

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name", 
        "employee_number",
    ]

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_salespersons(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalesPersonEncoder,
        )
    else: #POST
        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson, 
            encoder = SalesPersonEncoder, 
            safe=False,
        )
        


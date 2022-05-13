from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder


from .models import SalesPerson, Customer, AutomobileVO, SaleRecord

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "color",
        "year",
        "vin",
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name", 
        "employee_number",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "salesperson",
        "customer",
        "sale_price",
        "automobile",
    ]
    encoders = {
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }


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
        
@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder = CustomerEncoder,
        )
    else: #POST
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder = CustomerEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_salerecords(request):
    if request.method == "GET":
        salerecords = SaleRecord.objects.all()
        return JsonResponse(
            {"salerecords": salerecords},
            encoder = SaleRecordEncoder,
        )
    else: #Post
        content = json.loads(request.body)
        try:
            #to get the automobile property, get object with matching import_href, set that to automobile
            automobile = AutomobileVO.objects.get(import_href=content["automobile"])
            #then set the value of automobile to the key "automobile"
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"}
            )
        try: 
            salesperson = SalesPerson.objects.get(employee_number = content["salesperson"])
            content["salesperson"] = salesperson
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee number"}
            )
        try:
            customer = Customer.objects.get(phone_number = content["customer"])
            content["customer"]= customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer phone number"}
            )
        salerecord = SaleRecord.objects.create(**content)
        return JsonResponse(
            salerecord, 
            encoder = SaleRecordEncoder, 
            safe=False,
        )

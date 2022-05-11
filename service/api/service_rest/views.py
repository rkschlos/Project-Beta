from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, ServiceAppointment, Technician
import json

# Create your views here.

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin,"
    ]

class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "owner",
        "date",
        # "technician",
        "reason",
        "id",
    ]
    encoders = {
    "vin": AutomobileVOEncoder()
    }

    def get_extra_data(self, o):
        return {"vin": o.vin, "technician": o.technician.name}

@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not enter technician"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def api_delete_technician(request, pk):
    try:
        technician = Technician.objects.get(id=pk)
        technician.delete()
        return JsonResponse(
          technician,
          encoder=TechnicianEncoder,
          safe=False,
        )
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Does not exist"})




@require_http_methods(["GET", "POST"])
def api_appointments_list(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            owner = content["owner"]
            auto = ServiceAppointment.objects.get(pk=owner)
            content["auto"] = auto
            auto = ServiceAppointment.objects.create(**content)
            return JsonResponse(
                auto,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_appointments(request, pk):
    if request.method == "GET":
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            appointment = ServiceAppointment.objects.get(id=pk)
            props = ["owner", "vin", "date", "technician", "reason"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

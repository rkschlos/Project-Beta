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
        "date_time",
        "reason",
        "id",
        "is_vip",
        "finished",
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
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician

        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"}, status=404
            )

        # if content["finished"] == True:
        #     content["finished"] = True
        # else:
        #     content["finished"] = False

        content["is_vip"] = AutomobileVO.objects.filter(vin=content["vin"]).exists()
        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            appointment, encoder=ServiceAppointmentEncoder, safe=False
        )


@require_http_methods(["DELETE", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        ServiceAppointment.objects.filter(id=pk).update(**content)
        service = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceAppointmentEncoder,
            safe=False
        )

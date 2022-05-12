from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=7, unique=True)

    def __str__(self):
        return self.name

class ServiceAppointment(models.Model):
    owner = models.CharField(max_length=200)
    vin = models.CharField(max_length=17, unique=True)
    date_time = models.DateTimeField()

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    reason = models.TextField()
    is_vip = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)

    def __str__(self):
        return self.owner
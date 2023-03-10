from django.db import models

# Create your models here.
class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    phone_number = models.CharField(max_length=12)

    def __str__(self):
        return self.name

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin= models.CharField(max_length=17, unique=True)



class SaleRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO, 
        related_name = "sale_records", 
        on_delete = models.PROTECT,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name = "sale_records",
        on_delete = models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer, 
        related_name = "sale_records",
        on_delete = models.PROTECT,
    )
    sale_price = models.PositiveIntegerField()




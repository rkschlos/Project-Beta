# Generated by Django 4.0.3 on 2022-05-12 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_serviceappointment_finished'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceappointment',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]

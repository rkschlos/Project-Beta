# Generated by Django 4.0.3 on 2022-05-11 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='serviceappointment',
            name='is_vip',
            field=models.BooleanField(default=False),
        ),
    ]

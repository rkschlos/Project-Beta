# Generated by Django 4.0.3 on 2022-05-11 19:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='salerecord',
            old_name='sales_person',
            new_name='salesperson',
        ),
    ]
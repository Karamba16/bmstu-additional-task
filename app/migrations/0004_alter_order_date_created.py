# Generated by Django 4.2.7 on 2024-02-24 22:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_order_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 2, 24, 22, 3, 35, 175129, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
    ]

# Generated by Django 2.1.7 on 2019-04-08 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0011_auto_20190408_1415'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='zipcode',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
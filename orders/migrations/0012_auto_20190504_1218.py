# Generated by Django 2.1 on 2019-05-04 12:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0011_order_packages'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderpackages',
            name='order',
        ),
        migrations.RemoveField(
            model_name='orderpackages',
            name='package',
        ),
        migrations.RemoveField(
            model_name='order',
            name='packages',
        ),
        migrations.DeleteModel(
            name='OrderPackages',
        ),
    ]

# Generated by Django 2.1 on 2019-04-15 14:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_remove_order_note'),
        ('contacts', '0012_auto_20190408_1600'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='contact',
        ),
        migrations.RemoveField(
            model_name='note',
            name='user',
        ),
        migrations.DeleteModel(
            name='Note',
        ),
    ]

# Generated by Django 2.2 on 2019-04-18 11:26

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('steps', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='step',
            name='actions',
        ),
        migrations.AddField(
            model_name='step',
            name='actions2',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=[]),
        ),
    ]

# Generated by Django 2.1 on 2019-05-10 14:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('steps', '0008_auto_20190510_1403'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='step',
            options={'ordering': ('id',)},
        ),
    ]
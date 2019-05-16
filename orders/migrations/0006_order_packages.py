# Generated by Django 2.2b1 on 2019-05-03 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packages', '0004_auto_20190426_1117'),
        ('orders', '0005_auto_20190503_1827'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='packages',
            field=models.ManyToManyField(related_name='orders', through='orders.OrderPackages', to='packages.Package'),
        ),
    ]

# Generated by Django 2.1 on 2019-04-14 17:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0015_auto_20190414_2222'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='contactmarketinghistory',
            options={'ordering': ('created',)},
        ),
    ]
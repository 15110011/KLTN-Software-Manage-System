# Generated by Django 2.1 on 2019-04-15 14:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0017_auto_20190415_2119'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='note',
            unique_together={('campaign', '_type')},
        ),
    ]
# Generated by Django 2.1 on 2019-04-13 19:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_auto_20190411_1106'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='packageorder',
            name='order',
        ),
        migrations.RemoveField(
            model_name='packageorder',
            name='package',
        ),
        migrations.RemoveField(
            model_name='order',
            name='packages',
        ),
        migrations.AlterField(
            model_name='order',
            name='note',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='contacts.Note'),
        ),
        migrations.DeleteModel(
            name='PackageOrder',
        ),
    ]
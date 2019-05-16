# Generated by Django 2.2b1 on 2019-05-02 17:49

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('packages', '0004_auto_20190426_1117'),
        ('orders', '0003_auto_20190418_1827'),
    ]

    operations = [
        migrations.CreateModel(
            name='LifetimeLicense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('start_date', models.DateField()),
                ('code', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lifetime_licenses', to='orders.Order')),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='packages_lifetime_license', to='packages.Package')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='License',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('start_date', models.DateField()),
                ('duration', models.IntegerField()),
                ('code', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='licenses', to='orders.Order')),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='packages_license', to='packages.Package')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

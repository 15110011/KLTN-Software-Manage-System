# Generated by Django 2.2.1 on 2019-05-23 16:31

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0001_initial'),
        ('campaigns', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('actions', django.contrib.postgres.fields.jsonb.JSONField(default=[])),
                ('duration', models.IntegerField()),
                ('conditions', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('follow_up', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='steps', to='campaigns.FollowUpPlan')),
                ('mail_template', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='campaigns.MailTemplate')),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='StepDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('information', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('status', models.CharField(choices=[('RUNNING', 'Running'), ('COMPLETED', 'Completed')], default='RUNNING', max_length=50)),
                ('thread', django.contrib.postgres.fields.jsonb.JSONField(default=[])),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='step_details', to='orders.Order')),
                ('step', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='step_detail', to='steps.Step')),
            ],
            options={
                'ordering': ('id',),
            },
        ),
    ]

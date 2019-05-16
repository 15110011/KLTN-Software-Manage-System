# Generated by Django 2.2 on 2019-04-15 06:47

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0003_auto_20190410_1332'),
        ('packages', '0002_auto_20190415_1027'),
        ('campaigns', '0004_auto_20190410_1332'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='marketingplan',
            name='actions',
        ),
        migrations.AddField(
            model_name='campaign',
            name='packages',
            field=models.ManyToManyField(blank=True, related_name='campaigns', to='packages.Package'),
        ),
        migrations.AddField(
            model_name='contactmarketing',
            name='status',
            field=models.TextField(choices=[('FAILED', 'Failed'), ('RUNNING', 'Running'), ('COMPLETED', 'Completed'), ('OVERDUE', 'Overdue')], default='RUNNING'),
        ),
        migrations.AddField(
            model_name='marketingplan',
            name='actions2',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=10), default=list, size=8),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='end_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='start_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='contactmarketing',
            name='priority',
            field=models.IntegerField(choices=[(0, 'Low'), (1, 'Medium'), (2, 'High')], default=2),
        ),
        migrations.AlterUniqueTogether(
            name='contactmarketing',
            unique_together={('marketing_plan', 'contact')},
        ),
        migrations.CreateModel(
            name='ContactMarketingHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('action', models.CharField(max_length=20)),
                ('contact_marketing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='histories', to='campaigns.ContactMarketing')),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
        migrations.RemoveField(
            model_name='contactmarketing',
            name='is_completed',
        ),
    ]

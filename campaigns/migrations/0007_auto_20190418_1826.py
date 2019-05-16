# Generated by Django 2.2 on 2019-04-18 11:26

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contacts', '0003_auto_20190410_1332'),
        ('campaigns', '0006_auto_20190415_1348'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='assigned_to',
            field=models.ManyToManyField(related_name='sale_reps_campaign', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='marketingplan',
            name='actions',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=50), default=list, size=8),
        ),
        migrations.AlterUniqueTogether(
            name='contactmarketing',
            unique_together={('campaign', 'contact')},
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('name', models.TextField()),
                ('content', models.TextField(blank=True, null=True)),
                ('_type', models.CharField(choices=[('DEFAULT', 'Default'), ('MARKETING', 'Marketing'), ('FOLLOWUP', 'Follow up')], default='Default', max_length=20)),
                ('campaign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notes', to='campaigns.Campaign')),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to='contacts.Contact')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('campaign', '_type', 'contact')},
            },
        ),
    ]

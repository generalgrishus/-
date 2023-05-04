# Generated by Django 4.2 on 2023-05-04 11:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lon', models.DecimalField(decimal_places=6, max_digits=9, verbose_name='longitude')),
                ('lat', models.DecimalField(decimal_places=6, max_digits=9, verbose_name='latitude')),
                ('description', models.TextField(blank=True, null=True)),
                ('is_visited', models.BooleanField(default=False)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

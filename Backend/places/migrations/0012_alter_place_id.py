# Generated by Django 4.2 on 2023-06-06 14:30

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0011_alter_place_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]

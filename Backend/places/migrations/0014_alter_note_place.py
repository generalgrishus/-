# Generated by Django 4.2 on 2023-06-10 11:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0013_alter_note_place'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='place',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='places.place'),
        ),
    ]

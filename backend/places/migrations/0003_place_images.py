# Generated by Django 3.2.5 on 2021-08-02 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_managers', '0002_auto_20210802_1933'),
        ('places', '0002_place_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='images',
            field=models.ManyToManyField(to='file_managers.Image', verbose_name='images'),
        ),
    ]

# Generated by Django 3.2.5 on 2021-08-12 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inquiries', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inquiry',
            name='category',
            field=models.TextField(default='', verbose_name='문의 종류'),
        ),
    ]
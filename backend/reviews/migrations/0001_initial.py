# Generated by Django 3.2.5 on 2021-07-31 16:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('places', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='추가된 일시')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='수정된 일시')),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True, verbose_name='삭제된 일시')),
                ('score', models.IntegerField(default=0, verbose_name='평점')),
                ('content', models.TextField(verbose_name='리뷰 내용')),
                ('place', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='places.place', verbose_name='장소')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='유저')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

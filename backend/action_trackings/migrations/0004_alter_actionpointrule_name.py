# Generated by Django 3.2.5 on 2021-08-04 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('action_trackings', '0003_alter_actionpointrule_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actionpointrule',
            name='name',
            field=models.CharField(choices=[('제보 등록', 'add_report'), ('리뷰 생성', 'add_review'), ('신고 생성', 'add_inquiry')], default='제보 등록', max_length=20, verbose_name='행동'),
        ),
    ]

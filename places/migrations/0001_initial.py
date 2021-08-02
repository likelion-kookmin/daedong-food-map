# Generated by Django 3.2.5 on 2021-07-31 16:48

from django.db import migrations, models
import taggit.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('taggit', '0003_taggeditem_add_unique_index'),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='추가된 일시')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='수정된 일시')),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True, verbose_name='삭제된 일시')),
                ('name', models.CharField(max_length=300, verbose_name='장소명')),
                ('address', models.TextField(verbose_name='주소')),
                ('longitude', models.FloatField(blank=True, null=True, verbose_name='경도')),
                ('latitude', models.FloatField(blank=True, null=True, verbose_name='위도')),
                ('total_score', models.PositiveBigIntegerField(blank=True, default=0, verbose_name='전체 리뷰 평점 합')),
                ('review_count', models.PositiveBigIntegerField(blank=True, default=0, verbose_name='전체 리뷰 수')),
                ('tags', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
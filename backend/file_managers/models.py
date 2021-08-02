from django.db import models
from config.models import BaseModel
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Image(BaseModel):
    name = models.TextField(
        verbose_name="이미지 대표 이름",
        null=True,
        blank=True,
    )
    image = models.ImageField(
        verbose_name="이미지",
        null=False,
        blank=False,
    )

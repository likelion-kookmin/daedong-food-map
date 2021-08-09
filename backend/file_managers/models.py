from config.models import BaseModel
from django.db import models


class Image(BaseModel):
    name = models.TextField(
        verbose_name="이미지 대표 이름",
        null=True,
        blank=True,
    )
    image = models.TextField(
        blank=True,
        null=True
    )

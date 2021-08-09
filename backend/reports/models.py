from config.models import BaseModel
from django.db import models
from places.models import Place
from users.models import User


class Report(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='유저'
    )
    place = models.ForeignKey(
        Place,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='장소'
    )
    title = models.CharField(
        verbose_name="제보 제목",
        null=False,
        blank=False,
        max_length=300,
    )
    content = models.TextField(
        verbose_name="제보 내용",
        null=True,
        blank=True,
    )

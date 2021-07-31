from django.db import models
from config.models import BaseModel
from users.models import User
from places.models import Place


class Review(BaseModel):
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
    score = models.IntegerField(
        verbose_name="평점",
        default=0,
    )
    content = models.TextField(
        verbose_name="리뷰 내용"
    )

from django.db import models
from django.db.models.deletion import SET_NULL
from config.models import BaseModel
from users.models import User
from places.models import Place


class InquiryCategory(BaseModel):
    name = models.TextField()


class Inquiry(BaseModel):
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
    category = models.ForeignKey(
        InquiryCategory,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="문의 종류"
    )
    content = models.TextField(
        verbose_name="문의 내용"
    )

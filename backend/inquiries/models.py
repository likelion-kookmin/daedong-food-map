from config.models import BaseModel
from django.db import models
from django.db.models.deletion import SET_NULL
from places.models import Place
from users.models import User


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
    category = models.TextField(
        verbose_name="문의 종류",
        default=""
    )
    content = models.TextField(
        verbose_name="문의 내용"
    )

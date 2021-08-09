from config.models import BaseModel
from django.core.exceptions import ValidationError
from django.db import models
from places.models import Place
from users.models import User


class Bookmark(BaseModel):
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



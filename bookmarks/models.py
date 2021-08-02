from django.db import models
from config.models import BaseModel
from users.models import User
from places.models import Place

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
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from users.models import User
from config.models import BaseModel


class Action(models.TextChoices):
    ADD_REPORT = '제보 등록', _('add_report')


class ActionTracking(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="유저"
    )
    actionable_type = models.ForeignKey(
        ContentType,
        verbose_name="액션 관련 모델",
        on_delete=models.CASCADE,
        null=True,
    )
    actionable_id = models.PositiveIntegerField(
        verbose_name="액션 관련 객체 id",
        null=True,
    )
    actionable = GenericForeignKey(
        'actionable_type',
        'actionable_id',
    )
    count = models.IntegerField(
        verbose_name="횟수",
        default=1,
    )

from django.db import models
from config.models import BaseModel
from taggit.managers import TaggableManager


class Place(BaseModel):
    name = models.CharField(
        verbose_name='장소명',
        max_length=300,
        null=False,
        blank=False,
    )
    address = models.TextField(
        verbose_name='주소',
        null=False,
        blank=False,
    )
    longitude = models.FloatField(
        verbose_name='경도',
        null=True,
        blank=True,
    )
    latitude = models.FloatField(
        verbose_name='위도',
        null=True,
        blank=True,
    )
    total_score = models.PositiveBigIntegerField(
        verbose_name='전체 리뷰 평점 합',
        default=0,
        blank=True,
    )
    review_count = models.PositiveBigIntegerField(
        verbose_name='전체 리뷰 수',
        default=0,
        blank=True,
    )
    tags = TaggableManager()

    def __str__(self) -> str:
        return self.name

    @property
    def average_score(self):
        return 0 if self.review_count == 0 else self.total_score // self.review_count

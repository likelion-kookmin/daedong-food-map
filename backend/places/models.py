from config.models import BaseModelManager
from django.db import models
from config.models import BaseModel
from taggit.managers import TaggableManager


class PlaceQuerySet(models.QuerySet):
    def recent(self):
        return self.order_by("-created_at")

    def in_review(self):
        return self.filter(status='r')

    def published(self):
        return self.filter(status='p')


class Place(BaseModel):

    STATUS_CHOICES = (
        ('r', 'in_review'),
        ('p', 'published'),
    )

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

    status = models.CharField(
        verbose_name='장소 상태',
        max_length=1,
        default='r',
        null=False,
        choices=STATUS_CHOICES
    )

    objects = BaseModelManager.from_queryset(PlaceQuerySet)()

    def __str__(self) -> str:
        return self.name

    @property
    def average_score(self):
        return 0 if self.review_count == 0 else self.total_score // self.review_count

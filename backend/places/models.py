"""# places models"""
from config.models import BaseModel, BaseModelManager
from django.db import models
from taggit.managers import TaggableManager

LONGITUDE_DIFF = 0.2
LATITUDE_DIFF = 0.2


class PlaceQuerySet(models.QuerySet):
    """## PlaceQuerySet"""

    def in_review(self):
        """### in_review
        - 현재 관리자가 검토중인 장소를 도출하는 쿼리셋입니다.
        """
        return self.filter(status='r')

    def published(self):
        """### published
        - 현재 공개된 장소를 도출하는 쿼리셋입니다.
        """
        return self.filter(status='p')

    def nearby(self, longitude, latitude):
        """# nearby
        - 주어진 좌표 주변에 있는 장소를 도출하는 쿼리셋입니다.
        """
        if not longitude or not latitude:
            return self

        return self.filter(
            longitude__gte=longitude-LONGITUDE_DIFF,
            longitude__lte=longitude+LONGITUDE_DIFF,
            latitude__gte=latitude-LATITUDE_DIFF,
            latitude__lte=latitude+LATITUDE_DIFF,
        )


class Place(BaseModel):
    """## Place"""
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
        return str(self.name)

    @property
    def average_score(self):
        """### average_score
        - 평균 점수를 도출하는 함수입니다.
        """
        return 0 if self.review_count == 0 else self.total_score // self.review_count

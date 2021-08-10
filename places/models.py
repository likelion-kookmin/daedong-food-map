"""# places models"""
from config.models import BaseModel, BaseModelManager
from django.db import models
from file_managers.models import Image
from taggit.managers import TaggableManager
# from django.db.models.expressions import RawSQL
# from config.settings import USE_HEROKU

LONGITUDE_DIFF = 10
LATITUDE_DIFF = 10


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

    # def nearby(self, longitude, latitude, max_distance=None):
    #     """# nearby
    #     - 주어진 좌표 주변에 있는 장소를 도출하는 쿼리셋입니다.
    #     """
    #     gcd_formula = "6371 * acos(MIN(greatest(\
    #     cos(radians(%s)) * cos(radians(latitude)) \
    #     * cos(radians(longitude) - radians(%s)) + \
    #     sin(radians(%s)) * sin(radians(latitude)) \
    #     , -1), 1))" if USE_HEROKU else "6371 * acos(MIN(MAX(cos(radians(%s)) * cos(radians(latitude)) \
    #     * cos(radians(longitude) - radians(%s)) + sin(radians(%s)) * sin(radians(latitude)) "
    #     distance_raw_sql = RawSQL(
    #         gcd_formula,
    #         (latitude, longitude, latitude)
    #     )
    #     qs = self.annotate(distance=distance_raw_sql).order_by('distance')
    #     if max_distance is not None:
    #         qs = qs.filter(distance__lt=max_distance)
    #     return qs


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
    detail_address = models.TextField(
        verbose_name='상세 주소',
        null=True,
        blank=True,
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
    tags = TaggableManager(
        blank=True,
    )

    status = models.CharField(
        verbose_name='장소 상태',
        max_length=1,
        default='r',
        null=False,
        choices=STATUS_CHOICES
    )

    images = models.ManyToManyField(
        Image,
        verbose_name="images",
        blank=True,
    )

    view_count = models.IntegerField(
        verbose_name='장소의 조회수',
        default=0,
        blank=True,
    )

    bookmark_count = models.IntegerField(
        verbose_name='장소가 북바크 당한 숫자',
        default=0,
        blank=True,
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

"""# places serializers"""
from math import asin, atan2, cos, pi, sin, sqrt

from bookmarks.models import Bookmark
from drf_writable_nested.serializers import WritableNestedModelSerializer
from file_managers.serializers import ImageSerializer
from reports.models import Report
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from reviews.models import Review
from reviews.serializers import ReviewSerializer
from taggit_serializer.serializers import (TaggitSerializer,
                                           TagListSerializerField)
from users.models import User
from users.serializers import UserSerializer

from .models import Place


def deg2rad(deg):
    return deg * (pi / 180)


def getDistanceFromLatitudeAndLongitudeInMeter(latitude1, longitude1, latitude2, longitude2):
    R = 6371
    dLat = deg2rad(abs(latitude2 - latitude1))
    dLon = deg2rad(abs(longitude2 - longitude1))
    a = sin(dLat/2) * sin(dLat/2) + \
        cos(deg2rad(latitude1)) * cos(deg2rad(latitude2)) * \
        sin(dLon/2) * sin(dLon/2)
    distance = R * (2 * atan2(sqrt(a), sqrt(1-a))) * 1000
    return distance  # meter


class PlaceSerializer(TaggitSerializer, WritableNestedModelSerializer):
    """## PlaceSerializer
    - Place Model serializer입니다.
    """
    tags = TagListSerializerField(required=False)
    images = ImageSerializer(many=True, required=False)
    user = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    distance = serializers.SerializerMethodField()
    average_score = serializers.ReadOnlyField()
    is_bookmarked = serializers.SerializerMethodField()

    class Meta:
        """### PlaceSerializer.Meta"""
        model = Place
        fields = '__all__'
        read_only_fields = [
            'user',
            'distance',
            'reviews',
            'view_count',
            'status',
            'total_score',
            'review_count',
            'bookmark_count',
            'created_at',
            'updated_at',
            'deleted_at',
        ]

    def get_user(self, obj):
        """### get_user
            - 현재 제보의 user 값을 가져온다
        """
        report = Report.objects.filter(place=obj).first()
        if report and report.user:
            return UserSerializer(report.user).data

        return None

    def get_distance(self, obj):
        if (not "latitude" in self.context) or (not "longitude" in self.context):
            return 0
        if not self.context["latitude"] or not self.context["longitude"]:
            return 0

        user_latitude = float(self.context["latitude"])
        user_longitude = float(self.context["longitude"])
        return round(getDistanceFromLatitudeAndLongitudeInMeter(
            user_latitude,
            user_longitude,
            obj.latitude,
            obj.longitude
        ), 5)

    def get_reviews(self, obj):
        return ReviewSerializer(Review.objects.filter(place=obj), many=True).data or []

    def get_content(self, obj):
        report = Report.objects.filter(place=obj).first()
        if report:
            return report.content
        return None

    def get_is_bookmarked(self, obj):
        try:
            current_user = self.context['request'].user

            return Bookmark.objects.filter(
                user=current_user, place=obj
            ).exists()
        except:
            return False

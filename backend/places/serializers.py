"""# places serializers"""
from file_managers.serializers import ImageSerializer
from reports.models import Report
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from taggit_serializer.serializers import (TaggitSerializer,
                                           TagListSerializerField)
from users.models import User
from users.serializers import UserSerializer

from .models import Place


class PlaceSerializer(TaggitSerializer, ModelSerializer):
    """## PlaceSerializer
    - Place Model serializer입니다.
    """
    tags = TagListSerializerField(required=False)
    images = ImageSerializer(many=True, required=False)
    user = serializers.SerializerMethodField()

    class Meta:
        """### PlaceSerializer.Meta"""
        model = Place
        fields = '__all__'
        read_only_fields = [
            'user',
            'view_count',
            'status',
            'total_score',
            'review_count',
            'created_at',
            'updated_at',
            'deleted_at',
        ]

    def get_user(self, obj):
        """### get_user
            - 현재 제보의 user 값을 가져온다
        """
        user = Report.objects.filter(place=obj).first().user
        user_serializers = UserSerializer(user)
        return user_serializers.data

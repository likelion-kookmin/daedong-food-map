"""# places serializers"""
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Place
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)


class PlaceSerializer(TaggitSerializer, ModelSerializer):
    """## PlaceSerializer
    - Place Model serializer입니다.
    """
    tags = TagListSerializerField()

    class Meta:
        """### PlaceSerializer.Meta"""
        model = Place
        fields = '__all__'
        read_only_fields = [
            'author',
            'total_score',
            'review_count',
            'created_at',
            'updated_at',
            'deleted_at',
        ]

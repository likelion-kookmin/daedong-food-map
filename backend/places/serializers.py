"""# places serializers"""
from rest_framework.serializers import ModelSerializer
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

from file_managers.serializers import ImageSerializer
from .models import Place


class PlaceSerializer(TaggitSerializer, ModelSerializer):
    """## PlaceSerializer
    - Place Model serializer입니다.
    """
    tags = TagListSerializerField()
    images = ImageSerializer(many=True)

    class Meta:
        """### PlaceSerializer.Meta"""
        model = Place
        fields = '__all__'
        read_only_fields = [
            'status',
            'total_score',
            'review_count',
            'created_at',
            'updated_at',
            'deleted_at',
        ]
        optional_fields = [
            'tags',
            'images',
        ]

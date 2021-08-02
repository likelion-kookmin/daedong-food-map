"""# places serializers"""
from file_managers.serializers import ImageSerializer
from rest_framework.serializers import ModelSerializer
from taggit_serializer.serializers import (TaggitSerializer,
                                           TagListSerializerField)

from .models import Place


class PlaceSerializer(TaggitSerializer, ModelSerializer):
    """## PlaceSerializer
    - Place Model serializer입니다.
    """
    tags = TagListSerializerField(required=False)
    images = ImageSerializer(many=True, required=False)

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

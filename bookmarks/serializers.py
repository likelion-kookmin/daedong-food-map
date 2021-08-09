"""# bookmarks serializers"""

from places.models import Place
from places.serializers import PlaceSerializer
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Bookmark


class BookmarkSerializer(ModelSerializer):
    """## BookmarkSerializer"""
    place = PlaceSerializer(read_only=True)
    place_id = serializers.PrimaryKeyRelatedField(
        source='place',  queryset=Place.objects.all(), write_only=True)

    class Meta:
        """### ReviewSerializer.Meta"""
        model = Bookmark
        fields = [
            'place',
            'place_id',
            'user',
            'created_at',
            'updated_at',
            'deleted_at',
        ]
        read_only_fields = [
            'place',
            'user',
            'created_at',
            'updated_at',
            'deleted_at',
        ]
        write_only_fields = [
            'place_id',
        ]


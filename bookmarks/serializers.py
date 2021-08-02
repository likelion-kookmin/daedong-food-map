"""# bookmarks serializers"""

from places.serializers import PlaceSerializer
from rest_framework import fields, serializers
from rest_framework.serializers import ModelSerializer

from .models import Bookmark


class BookmarkSerializer(ModelSerializer):
    """## BookmarkSerializer"""

    class Meta:
        """### ReviewSerializer.Meta"""
        model = Bookmark
        fields = '__all__'
        read_only_fields = [
            'user',
            'created_at',
            'updated_at',
            'deleted_at',
        ]

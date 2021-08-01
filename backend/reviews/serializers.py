"""# reviews serializers"""

from rest_framework import fields
from places.serializers import PlaceSerializer
from .models import Review
from rest_framework.serializers import ModelSerializer


class ReviewSerializer(ModelSerializer):
    """## ReviewSerializer"""
    place = PlaceSerializer()

    class Meta:
        """### ReviewSerializer.Meta"""
        model = Review
        fields = '__all__'
        read_only_fields = [
            'user',
            'created_at',
            'updated_at',
            'deleted_at',
        ]

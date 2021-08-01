"""# reviews serializers"""

from rest_framework import fields
from .models import Review
from rest_framework.serializers import ModelSerializer


class ReviewSerializer(ModelSerializer):
    """## ReviewSerializer"""

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

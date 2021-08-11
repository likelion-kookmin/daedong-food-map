"""# reviews serializers"""

from places.models import Place
from rest_framework import fields, serializers
from rest_framework.serializers import ModelSerializer
from users.serializers import UserSerializer

from .models import Review


class ReviewSerializer(ModelSerializer):
    """## ReviewSerializer"""

    place_id = serializers.PrimaryKeyRelatedField(
        source='place',  queryset=Place.objects.all(), write_only=True)
    user = serializers.SerializerMethodField()

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

    def get_user(self, obj):
        """### get_user
        """
        return UserSerializer(obj.user).data

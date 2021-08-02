"""# inquiries serializers"""
from places.models import Place
from places.serializers import PlaceSerializer
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Inquiry


class InquirySerializer(ModelSerializer):
    """## InquirySerializer
    - Inquiry Model serializer입니다.
    """
    place = PlaceSerializer(read_only=True)
    place_id = serializers.PrimaryKeyRelatedField(
        source='place',  queryset=Place.objects.all(), write_only=True)

    class Meta:
        """### InquirySerializer.Meta"""
        model = Inquiry
        fields = '__all__'
        read_only_fields = [
            'user',
            'created_at',
            'updated_at',
            'deleted_at',
        ]

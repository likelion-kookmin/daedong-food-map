from rest_framework.serializers import ModelSerializer

from .models import Image


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
        read_only_fields = [
            'created_at',
            'updated_at',
            'deleted_at',
        ]

"""# inquiries serializers"""
from rest_framework.serializers import ModelSerializer

from .models import Inquiry


class InquirySerializer(ModelSerializer):
    """## InquirySerializer
    - Inquiry Model serializer입니다.
    """

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

"""# reports serializers"""
from rest_framework.serializers import ModelSerializer

from .models import Report


class ReportSerializer(ModelSerializer):
    """## ReportSerializer
    - Report Model serializer입니다.
    """

    class Meta:
        """### ReportSerializer.Meta"""
        model = Report
        fields = '__all__'
        read_only_fields = [
            'user',
            'created_at',
            'updated_at',
            'deleted_at',
        ]

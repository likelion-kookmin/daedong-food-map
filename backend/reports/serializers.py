"""# reports serializers"""

from .models import Report
from places.serializers import PlaceSerializer
from drf_writable_nested.serializers import WritableNestedModelSerializer


class ReportSerializer(WritableNestedModelSerializer):
    """## ReportSerializer
    - Report Model serializer입니다.
    """
    place = PlaceSerializer()

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

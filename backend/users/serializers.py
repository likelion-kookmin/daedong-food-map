"""# reports serializers"""

from drf_writable_nested.serializers import WritableNestedModelSerializer

from .models import User


class UserSerializer(WritableNestedModelSerializer):
    """## ReportSerializer
    - Report Model serializer입니다.
    """

    class Meta:
        """### ReportSerializer.Meta"""
        model = User
        fields = [
            'id',
            'email',
            'nickname',
            'report_count',
            'review_count',
            'first_name',
            'last_name',
            'created_at',
            'updated_at',
            'avatar',
        ]
        read_only_fields = [
            'created_at',
            'updated_at',
            'deleted_at',
        ]

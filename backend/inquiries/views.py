from rest_framework.generics import ListAPIView
from config.views import BaseView

from .models import Inquiry
from .serializers import InquirySerializer


class InquiryListView(BaseView, ListAPIView):
    """# InquiryListView
    - 현재 유저가 신고한 목록이 반환된다.
    """
    serializer_class = InquirySerializer

    def get_queryset(self):
        return Inquiry.objects.filter(user=self.current_user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

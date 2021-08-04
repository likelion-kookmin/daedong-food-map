from config.views import BaseView
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, UpdateAPIView)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Inquiry
from .permissions import IsInquiryEditableOrDestroyable
from .serializers import InquirySerializer


class InquiryListView(BaseView, ListAPIView):
    """# InquiryListView
    - 현재 유저가 신고한 목록이 반환된다.
    """
    serializer_class = InquirySerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return Inquiry.objects.filter(user=self.current_user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class InquiryCreateView(BaseView, CreateAPIView):
    """# InquiryCreateView
    - 제보(place)를 신고한다
    """
    serializer_class = InquirySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def perform_create(self, serializer):
        serializer.save(user=self.current_user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class InquiryUpdateView(BaseView, UpdateAPIView):
    """# InquiryUpdateView
    - 신고(Inquiry)를 변경한다. (put/patch)
    """
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [IsAuthenticated, IsInquiryEditableOrDestroyable]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class InquiryDestroyView(BaseView, DestroyAPIView):
    """# InquiryDestroyView
    - 유저의 신고를 취소한다.
    """
    queryset = Inquiry.objects.all()

    serializer_class = InquirySerializer
    permission_classes = [IsAuthenticated, IsInquiryEditableOrDestroyable]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

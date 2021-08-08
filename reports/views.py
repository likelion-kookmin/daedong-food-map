from config.views import BaseView
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, RetrieveAPIView,
                                     UpdateAPIView)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Report
from .permissions import IsReportEditableOrDestroyable
from .serializers import ReportSerializer


class ReportListView(BaseView, ListAPIView):
    """# ReportListView
    - query params:
      - user_id
        - user_id가 있는 경우, 해당 유저가 제보한 목록이 반환된다.
        - 없는 경우, 전체 제보 목록이 반환된다.
    """
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Report.objects.filter(user__id=user_id)
        else:
            return Report.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ReportRetrieveView(BaseView, RetrieveAPIView):
    """# ReportRetrieveView
    - Report 객체를 제보한 유저를 return 한다.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ReportSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def get_queryset(self):
        return Report.objects.filter(user=self.current_user)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class ReportCreateView(BaseView, CreateAPIView):
    """# ReportCreateView
    - authorization
        - Header에 Authorization: "Bearer {ACCESS_TOKEN}"을 같이 넣어야 합니다.
    - format
    ```
        {
            "title": "이걸 제보합니다.",
            "content": "이건 제보 내용",
            "place": {
                "tags": ["태그1", "태그2", "태그3"],
                "name": "XX 장소",
                "address": "서울 XX역",
                "longitude": 123.123412312,
                "latitiude": 12.12312323
            }
        }
    ```
    """

    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def perform_create(self, serializer):
        serializer.save(user=self.current_user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ReportUpdateView(BaseView, UpdateAPIView):
    """# ReportUpdateView
    - authorization
        - Header에 Authorization: "Bearer {ACCESS_TOKEN}"을 같이 넣어야 합니다.
    - format
    ```
        {
            "title": "이걸 제보합니다.",
            "content": "이건 제보 내용",
            "place": {
                "tags": ["태그1", "태그2", "태그3"],
                "name": "XX 장소",
                "address": "서울 XX역",
                "longitude": 123.123412312,
                "latitiude": 12.12312323
            }
        }
    ```
    """

    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated, IsReportEditableOrDestroyable]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def put(self, request, *args, **kwargs):
        obj = self.get_object()

        if obj.place.status == 'p':
            return Response({'error': 'It has been already published'}, status=401)
        else:
            return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class ReportDestroyView(BaseView, DestroyAPIView):
    """# ReportDestroyView"""
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated, IsReportEditableOrDestroyable]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def delete(self, request, *args, **kwargs):
        self.current_user.report_count -= 1
        self.current_user.save()
        return self.destroy(request, *args, **kwargs)

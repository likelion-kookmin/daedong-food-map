from django.shortcuts import render


from rest_framework.generics import ListAPIView
from config.views import BaseView

from .models import Report
from .serializers import ReportSerializer


class ReportListView(BaseView, ListAPIView):
    """# ReportListView
    - query params:
      - user_id
        - user_id가 있는 경우, 해당 유저가 제보한 목록이 반환된다.
        - 없는 경우, 전체 제보 목록이 반환된다.
    """
    serializer_class = ReportSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        print(user_id)
        if user_id:
            return Report.objects.filter(user__id=user_id)
        else:
            return Report.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

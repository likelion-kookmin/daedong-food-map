from django.urls import path

from .views import ReportListView, ReportCreateView

app_name = 'reports'


urlpatterns = [
    path('', ReportListView.as_view()),
    path('new/', ReportCreateView.as_view()),
]

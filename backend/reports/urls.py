from django.urls import path

from .views import ReportListView, ReportCreateView, ReportUpdateView, ReportDestroyView

app_name = 'reports'


urlpatterns = [
    path('', ReportListView.as_view()),
    path('new/', ReportCreateView.as_view()),
    path('<int:pk>/edit/', ReportUpdateView.as_view()),
    path('<int:pk>/destroy/', ReportDestroyView.as_view()),
]

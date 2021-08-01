from django.urls import path

from .views import InquiryListView

app_name = 'inquiries'


urlpatterns = [
    path('', InquiryListView.as_view()),
]

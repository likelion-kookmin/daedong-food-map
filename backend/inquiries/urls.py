from django.urls import path

from .views import InquiryListView, InquiryCreateView, InquiryUpdateView, InquiryDestroyView

app_name = 'inquiries'


urlpatterns = [
    path('', InquiryListView.as_view()),
    path('new/', InquiryCreateView.as_view()),
    path('<int:pk>/edit/', InquiryUpdateView.as_view()),
    path('<int:pk>/destroy/', InquiryDestroyView.as_view()),
]

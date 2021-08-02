from django.urls import path

from .views import ReviewListView, ReviewRetrieveView, ReviewCreateView

app_name = 'reviews'


urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:pk>/', ReviewRetrieveView.as_view()),
    path('new/', ReviewCreateView.as_view()),
]

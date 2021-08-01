from django.urls import path

from .views import ReviewListView, ReviewRetrieveView, ReviewCreateView, ReviewUpdateView

app_name = 'reviews'


urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:pk>/', ReviewRetrieveView.as_view()),
    path('new/', ReviewCreateView.as_view()),
    path('<int:pk>/edit/', ReviewUpdateView.as_view()),
]

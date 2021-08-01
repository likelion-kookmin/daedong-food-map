from django.urls import path

from .views import ReviewListView

app_name = 'reviews'


urlpatterns = [
    path('', ReviewListView.as_view()),
]

from django.urls import path

from .views import PlaceListView

app_name = 'places'


urlpatterns = [
    path('', PlaceListView.as_view()),
]

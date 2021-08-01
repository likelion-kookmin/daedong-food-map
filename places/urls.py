from django.urls import path

from .views import PlaceListView

app_name = 'questions'


urlpatterns = [
    path('', PlaceListView.as_view()),
]

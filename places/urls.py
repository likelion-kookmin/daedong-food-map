from django.urls import path

from .views import PlaceListView, PlaceRetrieveView

app_name = 'questions'


urlpatterns = [
    path('', PlaceListView.as_view()),
    path('<int:pk>/', PlaceRetrieveView.as_view()),
]

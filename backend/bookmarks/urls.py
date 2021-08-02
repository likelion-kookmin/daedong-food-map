"""bookmarks url"""
from django.urls import path

from .views import BookmarkCreateView, BookmarkListView, BookmarkRetrieveView

app_name = 'bookmarks'


urlpatterns = [
    path('', BookmarkListView.as_view()),
    path('<int:pk>/', BookmarkRetrieveView.as_view()),
    path('new/', BookmarkCreateView.as_view()),
    # path('<int:pk>/destroy/', BookmarkDestroyView.as_view()),
]

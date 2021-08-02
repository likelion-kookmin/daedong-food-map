"""bookmarks admin"""
from django.contrib import admin

from .models import Bookmark


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    """BookmarkAdmin"""
    pass  # pylint: disable=W0107

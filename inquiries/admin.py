from django.contrib import admin
from .models import Inquiry, InquiryCategory


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    pass


@admin.register(InquiryCategory)
class InquiryCategoryAdmin(admin.ModelAdmin):
    pass

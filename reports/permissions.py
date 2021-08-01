"""# reports permissions"""
from rest_framework import permissions


class IsReportEditableOrDestroyable(permissions.BasePermission):
    """## IsReportEditableOrDestroyable"""

    def has_object_permission(self, request, view, obj):
        """### has_object_permission"""
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user and (obj.user == request.user or request.user.is_staff)

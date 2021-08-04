"""# action_trackings admin
- ActionTrackingAdmin
- ActionPointRuleAdmin
"""
from django.contrib import admin

from .models import ActionPointRule, ActionTracking


@admin.register(ActionTracking)
class ActionTrackingAdmin(admin.ModelAdmin):
    """ ## ActionTrackingAdmin
        - admin페이지에서 관리할 ActionTracking 모델 설정
    """

    list_display = [
        'user',
        'action_point_rule',
        'actionable_type',
        'actionable_id',
        'point'
    ]

    list_filter = [
        'user',
        'action_point_rule',
        'actionable_type',
        'actionable_id',
    ]

    search_fields = [
        'user__name',
        'point_rule__name',
    ]

    ordering = [
        '-updated_at',
    ]



@admin.register(ActionPointRule)
class PointRuleAdmin(admin.ModelAdmin):
    """## PointRuleAdmin
        - admin페이지에서 관리할 ActionPointRule모델을 설정
    """

    list_display = [
        'name',
        'point',
    ]

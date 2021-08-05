"""# action tracking signals"""
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from reports.models import Report
from reviews.models import Review

from .models import Action, ActionTracking

User = get_user_model()

@receiver(post_save, sender=Report)
def create_place_action_tracking(sender, **kwargs):
    """ ## create_place_action_tracking
        - place report 후의 action을 tracking합니다.
    """
    instance = kwargs["instance"]

    user = instance.user

    if not kwargs["created"]:
        return

    ActionTracking.create_user_action_tracking(
        user=user,
        rule_name=Action.ADD_REPORT,
        actionable=instance

    )

    user.report_count += 1
    user.save()

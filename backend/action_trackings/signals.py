"""# action tracking signals"""
from bookmarks.models import Bookmark
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from inquiries.models import Inquiry
from reports.models import Report
from reviews.models import Review

from .models import Action, ActionTracking

User = get_user_model()

@receiver(post_save, sender=Report)
def create_report_action_tracking(sender, **kwargs):
    """ ## create_report_action_tracking
        - place report 후의 action을 trackin합니다.
        - action tracking 모델에 로그를 남기고, user.report_count += 1 을 합니다.
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

@receiver(post_save, sender=Review)
def create_review_action_tracking(sender, **kwargs):
    """ ## create_review_action_tracking
        - review 생성 후의 action을 tracking합니다.
        - action tracking 모델에 로그를 남기고, user.review_count += 1 을 합니다.
    """
    instance = kwargs["instance"]

    user = instance.user

    if not kwargs["created"]:
        return

    ActionTracking.create_user_action_tracking(
        user=user,
        rule_name=Action.ADD_REVIEW,
        actionable=instance

    )

    user.review_count += 1
    user.save()

@receiver(post_save, sender=Inquiry)
def create_inquiry_action_tracking(sender, **kwargs):
    """ ## create_inquiry_action_tracking
        - inqury 생성 후의 action을 tracking합니다.
        - action tracking 모델에 로그를 남기고, user.inquiry_count += 1 을 합니다.
    """
    instance = kwargs["instance"]

    user = instance.user

    if not kwargs["created"]:
        return

    ActionTracking.create_user_action_tracking(
        user=user,
        rule_name=Action.ADD_INQUIRY,
        actionable=instance

    )

    user.inquiry_count += 1
    user.save()

@receiver(post_save, sender=Bookmark)
def create_bookmark_action_tracking(sender, **kwargs):
    """ ## create_bookmark_action_tracking
        - bookmark 생성 후의 action을 trackin합니다.
        - action tracking 모델에 로그를 남기고, place.bookmark_count += 1 을 합니다.
    """
    instance = kwargs["instance"]

    user = instance.user
    bookmark_place = instance.place

    if not kwargs["created"]:
        return

    ActionTracking.create_user_action_tracking(
        user=user,
        rule_name=Action.ADD_BOOKMARK,
        actionable=instance

    )

    bookmark_place.bookmark_count += 1
    bookmark_place.save()

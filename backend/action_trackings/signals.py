"""# action tracking signals"""
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from inquiries.models import Inquiry
from reports.models import Report
from reviews.models import Review

from .models import Action, ActionTracking

User = get_user_model()

@receiver(post_save, sender=Report)
def create_place_action_tracking(sender, **kwargs):
    """ ## create_place_action_tracking
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

@receiver(post_save, sender=Report)
def destroy_place_action_tracking(sender, **kwargs):
    """ ## destroy_place_action_tracking
        - place report 을 destroy 한 아후의 action을 trackin합니다.
        - action tracking 모델에 로그를 남기고, user.report_count -= 1 을 합니다.
    """
    instance = kwargs["instance"]

    user = instance.user

    if kwargs["created"]:
        return

    ActionTracking.create_user_action_tracking(
        user=user,
        rule_name=Action.DESTROY_REPORT,
        actionable=instance

    )

    user.report_count -= 1
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

@receiver(post_save, sender=Review)
def destroy_review_action_tracking(sender, **kwargs):
    """ ## destroy_review_action_tracking
        - review destroy 후의 action을 tracking합니다.
        - action tracking 모델에 로그를 남기고, user.review_count -= 1 을 합니다.
    """
    instance = kwargs["instance"]

    user = instance.user

    if kwargs["created"]:
        return

    ActionTracking.create_user_action_tracking(
        user=user,
        rule_name=Action.DESTORY_REVIEW,
        actionable=instance

    )

    user.review_count -= 1
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

@receiver(post_save, sender=Inquiry)
def destroy_inquiry_action_tracking(sender, **kwargs):
    """ ## destroy_inquiry_action_tracking
        - inqury destroy 후의 action을 tracking합니다.
        - action tracking 모델에 로그를 남기고, user.inquiry_count -= 1 을 합니다.
    """
    instance = kwargs["instance"]

    user = instance.user

    if kwargs["created"]:
        return

    ActionTracking.create_user_action_tracking(
        user=user,
        rule_name=Action.DESTROY_INQUIRY,
        actionable=instance

    )

    user.inquiry_count -= 1
    user.save()

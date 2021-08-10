from config.models import BaseModel
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import User


class Action(models.TextChoices):
    """# Action
    - 트래킹되는 사용자의 액션을 정의해놓은 클래스
    """

    ADD_REPORT = '제보 등록', _('add_report')
    ADD_REVIEW = '리뷰 생성', _('add_review')
    ADD_INQUIRY = '신고 생성', _('add_inquiry')
    ADD_BOOKMARK = '북마크 생성', _('add_bookmark')


class ActionPointRule(BaseModel):
    """# ActionPointRule
    - 사용자의 액션에 따른 점수를 지정하는 모델
    """

    point = models.IntegerField(default=0, verbose_name="점수")
    name = models.CharField(
        max_length=20, choices=Action.choices, default=Action.ADD_REPORT, verbose_name="행동"
    )

    def __str__(self):
        return str(self.name)

class ActionTracking(BaseModel):
    """# ActionTracking
    - 사용자의 행동을 기록하는 모델
    """
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="유저"
    )
    action_point_rule = models.ForeignKey(
        ActionPointRule,
        on_delete=models.CASCADE,
        verbose_name="규칙"
    )
    actionable_type = models.ForeignKey(
        ContentType,
        verbose_name="액션 관련 모델",
        on_delete=models.CASCADE,
        null=True,
    )
    actionable_id = models.PositiveIntegerField(
        verbose_name="액션 관련 객체 id",
        null=True,
    )
    actionable = GenericForeignKey(
        'actionable_type',
        'actionable_id',
    )
    count = models.IntegerField(
        verbose_name="횟수",
        default=1,
    )


    @property
    def point(self):
        """ ### point
            - point_rule.point를 반환합니다.
        """
        return self.action_point_rule.point

    @classmethod
    def create_user_action_tracking(cls, user, rule_name, actionable=None):
        """## create_user_action_tracking
            - action_tracking을 생성합니다.
            - params
                - user: User
                - rule_name: Action 모델상에 선언된 enum 값
                - actionable: action과 관련된 객체
        """
        if not user.is_authenticated:
            return

        rule = ActionPointRule.objects.get_or_create(name=rule_name)[0]
        if actionable:
            actionable_type = ContentType.objects.get_for_model(actionable)
            action_tracking_obj, created = cls.objects.get_or_create(
                user = user,
                action_point_rule = rule,
                actionable_type = actionable_type,
                actionable_id = actionable.id
            )
            if not created and rule_name in cls.ACTION_RELATED_HISTORY:
                action_tracking_obj.count += 1
                action_tracking_obj.save()
        else:
            cls.objects.create(user=user, action_point_rule=rule)

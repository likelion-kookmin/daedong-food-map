from django.apps import AppConfig


class ActionTrackingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'action_trackings'

    def ready(self):
        import action_trackings.signals

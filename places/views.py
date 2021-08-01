from rest_framework.generics import ListAPIView, RetrieveAPIView
from config.views import BaseView

from .models import Place
from .serializers import PlaceSerializer


class PlaceListView(BaseView, ListAPIView):
    queryset = Place.objects.published().all()
    serializer_class = PlaceSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class PlaceRetrieveView(BaseView, RetrieveAPIView):
    queryset = Place.objects.published().all()
    serializer_class = PlaceSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

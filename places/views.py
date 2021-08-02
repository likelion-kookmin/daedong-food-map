"""# places views"""
from config.views import BaseView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Place
from .serializers import PlaceSerializer


class PlaceListView(BaseView, ListAPIView):
    """## PlaceListView"""
    queryset = Place.objects.published().all()
    serializer_class = PlaceSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'address', 'tags__name']
    ordering_fields = ['name', 'address', 'created_at', 'updated_at']

    def get_queryset(self):
        longitude = float(self.request.query_params.get('longitude'))
        latitude = float(self.request.query_params.get('latitude'))

        if longitude and latitude:
            return Place.objects.published().nearby(longitude, latitude)\

        return Place.objects.published().all()

    def get(self, request, *args, **kwargs):

        return self.list(request, *args, **kwargs)


class PlaceRetrieveView(BaseView, RetrieveAPIView):
    """## PlaceRetrieveView"""
    queryset = Place.objects.published().all()
    serializer_class = PlaceSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
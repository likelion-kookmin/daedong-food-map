"""# places views"""
from config.views import BaseView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from .models import Place
from .serializers import PlaceSerializer


class PlaceListView(BaseView, ListAPIView):
    """## PlaceListView"""
    serializer_class = PlaceSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'address', 'tags__name']
    ordering_fields = ['name', 'address', 'created_at', 'updated_at']
    permission_classes = [AllowAny]

    def get_queryset(self):
        longitude = self.request.query_params.get('longitude')
        latitude = self.request.query_params.get('latitude')

        if longitude and latitude:
            longitude, latitude = map(float, (longitude, latitude))
            return Place.objects.published().nearby(longitude, latitude)

        return Place.objects.published().all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["longitude"] = self.request.query_params.get('longitude')
        context["latitude"] = self.request.query_params.get('latitude')
        return context

    def get(self, request, *args, **kwargs):

        return self.list(request, *args, **kwargs)


class PlaceRetrieveView(BaseView, RetrieveAPIView):
    """## PlaceRetrieveView"""
    queryset = Place.objects.published().all()
    serializer_class = PlaceSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.view_count += 1
        obj.save()
        return self.retrieve(request, *args, **kwargs)

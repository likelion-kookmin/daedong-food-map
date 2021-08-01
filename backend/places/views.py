from django.shortcuts import render


from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, RetrieveAPIView,
                                     UpdateAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from config.views import BaseView

from .models import Place
from .serializers import PlaceSerializer


class PlaceListView(BaseView, ListAPIView):
    queryset = Place.objects.published().all()
    serializer_class = PlaceSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

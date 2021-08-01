from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from config.views import BaseView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from .models import Review
from .serializers import ReviewSerializer


class ReviewListView(BaseView, ListAPIView):
    """# ReviewListView  
    - query params:
      - place_id
        - place_id가 있는 경우, 해당 장소의 리뷰 목록이 반환된다.
        - 없는 경우, 전체 리뷰 목록이 반환된다.
    """

    serializer_class = ReviewSerializer

    def get_queryset(self):
        place_id = self.request.query_params.get('place_id')
        if place_id:
            return Review.objects.filter(place__id=place_id)
        else:
            return Review.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ReviewRetrieveView(BaseView, RetrieveAPIView):
    """# ReviewRetrieveView"""
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class ReviewCreateView(BaseView, CreateAPIView):
    """# ReviewCreateView"""

    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def perform_create(self, serializer):
        serializer.save(user=self.current_user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

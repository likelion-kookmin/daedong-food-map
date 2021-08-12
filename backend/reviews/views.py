from config.views import BaseView
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, RetrieveAPIView,
                                     UpdateAPIView)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Place, Review
from .permissions import IsReviewEditableOrDestroyable
from .serializers import ReviewSerializer


class ReviewListView(BaseView, ListAPIView):
    """# ReviewListView
    - query params:
        - place_id
            - place_id가 있는 경우, 해당 장소의 리뷰 목록이 반환된다.
            - 없는 경우, 전체 리뷰 목록이 반환된다.
        - user_id
            - user_id가 있는 경우, 해당 유저의 리뷰 목록이 반환된다.
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        place_id = self.request.query_params.get('place_id')
        user_id = self.request.query_params.get('user_id')

        reviews = Review.objects.all()
        if place_id:
            reviews = reviews.filter(place__id=place_id)

        if place_id:
            reviews = reviews.filter(user__id=place_id)

        return reviews

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
        try:
            place_id = self.request.data.get('place_id')
            score = self.request.data.get('score')

            place = Place.objects.get(pk=place_id)
            place.review_count += 1
            place.total_score += score
            place.save()
        except:
            pass
        return self.create(request, *args, **kwargs)


class ReviewUpdateView(BaseView, UpdateAPIView):
    """# ReviewUpdateView
    - 가급적이면 patch를 사용해주세요.
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsReviewEditableOrDestroyable]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def put(self, request, *args, **kwargs):
        obj = self.get_object()
        try:
            prev_score = obj.score
            score = self.request.data.get('score')
            if score:
                place = obj.place
                place.total_score += int(score) - prev_score
                place.save()
        except:
            pass
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        obj = self.get_object()
        try:
            prev_score = obj.score
            score = self.request.data.get('score')
            if score:
                place = obj.place
                place.total_score += int(score) - prev_score
                place.save()
        except:
            pass
        return self.partial_update(request, *args, **kwargs)


class ReviewDestroyView(BaseView, DestroyAPIView):
    """ReviewDestroyView"""

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsReviewEditableOrDestroyable]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def delete(self, request, *args, **kwargs):
        try:
            review = self.get_object()
            place = review.place
            place.review_count -= 1
            place.total_score -= review.score
            place.save()
            self.current_user.review_count -= 1
            self.current_user.save()
        except:
            pass
        return self.destroy(request, *args, **kwargs)

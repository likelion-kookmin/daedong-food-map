from django.contrib import admin
from django.conf import settings
from django.shortcuts import render
from django.views.static import serve
from django.urls import path, include, re_path
from django.conf.urls.static import static
import debug_toolbar
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


openapi_info = openapi.Info(
    title="대동먹지도 API",
    default_version='v1',
    description="API description",
    terms_of_service="https://www.google.com/policies/terms/",
    contact=openapi.Contact(email="singun11@kookmin.ac.kr"),
    license=openapi.License(name="MIT LICENSE"),
)

schema_view = get_schema_view(
    openapi_info,
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls', 'users')),
    path('places/', include('places.urls', 'places')),
    path('reports/', include('reports.urls', 'reports')),
    path('__debug__/', include(debug_toolbar.urls)),
    path('jet/', include('jet.urls', 'jet')),
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('explorer/', include('explorer.urls')),
    path("unicorn/", include("django_unicorn.urls")),
    path('silk/', include('silk.urls', 'silk')),
    re_path(r'^media/(?P<path>.*)$', serve,
            {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,
            {'document_root': settings.STATIC_ROOT}),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger',
            cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc',
            cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

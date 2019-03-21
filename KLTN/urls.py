from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from account.views import MeView, LoginAndUpdateView, LogoutView, RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/token', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/v1/token/refresh',
         TokenRefreshView.as_view(), name='token_refresh'),

    # account views
    path('api/v1/me', MeView.as_view()),
    path('api/v1/login', LoginAndUpdateView.as_view()),
    path('api/v1/login/<int:pk>', LoginAndUpdateView.as_view()),
    path('api/v1/logout', LogoutView),
    path('api/v1/register', RegisterView.as_view()),
]

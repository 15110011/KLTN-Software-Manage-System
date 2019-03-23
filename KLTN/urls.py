from django.contrib import admin
from django.urls import include,path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from account.views import MeView, LoginAndUpdateView, LogoutView, RegisterView
from packages.views import ProductViewSet, PackageViewSet
from contacts.views import ContactView, ContactGroupView

router = DefaultRouter(trailing_slash=False)
#package app
router.register('products', ProductViewSet, base_name='products')
router.register('packages', PackageViewSet, base_name='packages')
#contact app
router.register('contacts', ContactView, base_name='contacts')
router.register('contactgroups', ContactGroupView, base_name='contactgroups')

urlpatterns = []
urlpatterns += router.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
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

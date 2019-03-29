from django.contrib import admin
from django.urls import include,path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from account.views import MeView, LoginAndUpdateView, LogoutView, RegisterView, ActivateView
from packages.views import ProductViewSet, PackageViewSet
from contacts.views import ContactView, ContactGroupView
from campaigns.views import MarketingPlanView, CampaignView, FollowUpPlanView
from orders.views import OrderHistoryView, OrderView, PackageOrderView
from steps.views import StepView, StepDetailView

router = DefaultRouter(trailing_slash=False)
#package app
router.register('products', ProductViewSet, base_name='products')
router.register('packages', PackageViewSet, base_name='packages')
#campaign app
router.register('marketing-plan', MarketingPlanView, base_name='marketing_plan')
router.register('followup-plan', FollowUpPlanView, base_name='followup_plan')
router.register('campaign', CampaignView, base_name='campaign')
#order app
router.register('orders', OrderView, base_name='orders')
router.register('order-histories', OrderHistoryView, base_name='order-histories')
router.register('package-orders', PackageOrderView, base_name='package-orders')
#contact app
router.register('contacts', ContactView, base_name='contacts')
router.register('contactgroups', ContactGroupView, base_name='contactgroups')
#step app
router.register('steps', StepView, base_name='steps')
router.register('step-detail', StepDetailView, base_name='step-detail')


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
    path('api/v1/activate', ActivateView)
]

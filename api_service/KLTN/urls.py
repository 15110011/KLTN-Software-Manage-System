from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from account.views import MeView, LoginAndUpdateView, LogoutView, RegisterView, ActivateView, SaleRepView, UserView
from packages.views import ProductViewSet, PackageViewSet, ProductCategoryView, ProductTypeView
from contacts.views import ContactView, ContactGroupView
from campaigns.views import MarketingPlanView, CampaignView, FollowUpPlanView, GetPlanAction, GetMarketingPlanConditions, ContactMatchConditions, NoteView, CampaignExtraView, AssignedCampaigns
from campaigns.views import ContactMarketingView, MailTemplateView
from orders.views import OrderHistoryView, OrderView, LicenseView, LifetimeLicenseView, OrderChartView, LicenseChartView
from steps.views import StepView, StepDetailView
from events.views import EventView
from reports.views import ReportView, Reports

router = DefaultRouter(trailing_slash=False)
# package app
router.register('products', ProductViewSet, base_name='products')
router.register('packages', PackageViewSet, base_name='packages')
router.register('product-categories', ProductCategoryView,
                base_name='product-categories')
router.register('product-types', ProductTypeView, base_name='product-types')
# campaign app
router.register('marketing-plans', MarketingPlanView,
                base_name='marketing_plans')
router.register('follow-up-plans', FollowUpPlanView,
                base_name='follow-up-plans')
router.register('campaigns', CampaignView, base_name='campaigns')
router.register('assigned-campaigns', AssignedCampaigns, base_name='assigned-campaigns')
router.register('notes', NoteView, base_name='notes')
router.register('contact-marketings', ContactMarketingView,
                base_name='contact-marketing')
router.register('mail-templates', MailTemplateView,
                base_name='mail-templates')
# order app
router.register('orders', OrderView, base_name='orders')
router.register('order-histories', OrderHistoryView,
                base_name='order-histories')
router.register('licenses', LicenseView, base_name='licenses')
router.register('lifetime-licenses', LifetimeLicenseView, base_name='lifetime_licenses')
router.register('orders-chart',OrderChartView, base_name='orders_chart')
router.register('licenses-chart',LicenseChartView, base_name='licenses_chart')
# contact app
router.register('contacts', ContactView, base_name='contacts')
router.register('contactgroups', ContactGroupView, base_name='contactgroups')
# step app
router.register('steps', StepView, base_name='steps')
router.register('step-detail', StepDetailView, base_name='step-detail')
# events app
router.register('events', EventView, base_name='events')
# account app
router.register('sale-reps', SaleRepView, base_name='sale-reps')
router.register('users', UserView, base_name='users')
#------------------------------------------------------------------------------------#

urlpatterns = []
urlpatterns += router.urls

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/token', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/v1/token/refresh',
         TokenRefreshView.as_view(), name='token_refresh'),
    path('django-rq/', include('django_rq.urls')),
    # account views
    path('api/v1/me', MeView.as_view()),
    path('api/v1/login', LoginAndUpdateView.as_view()),
    path('api/v1/login/<int:pk>', LoginAndUpdateView.as_view()),
    path('api/v1/logout', LogoutView),
    path('api/v1/register', RegisterView.as_view()),
    path('api/v1/activate', ActivateView),
    path('api/v1/actions', GetPlanAction),
    path('api/v1/marketing-plans-conditions', GetMarketingPlanConditions),
    path('api/v1/contacts-match-conditions', ContactMatchConditions),
    path('api/v1/reports', Reports),

    path('api/v1/campaigns/<int:pk>/note',
         CampaignExtraView.as_view({'get': 'note'})),
]

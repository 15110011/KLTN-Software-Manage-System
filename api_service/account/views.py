from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import logout, get_user_model, login
from django.forms.models import model_to_dict

from rest_framework import status, generics, viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework_simplejwt.backends import TokenBackend

import logging
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
from apiclient.discovery import build
import google_auth_oauthlib.flow
#

from . import serializers
from . import models
from KLTN import settings
from KLTN.gmail_utils import send_mail, exchange_code
from campaigns.models import Campaign
from campaigns.serializers import CampaignSerializer
import jwt
import requests
import json
from pprint import pprint
import datetime

log = logging.getLogger('account')

# Create your views here.


class MeView(generics.RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.MeSerializer

    def retrieve(self, request, *args, **kwargs):
        print(request.session.keys())
        if not request.user.is_authenticated:
            return Response({"msg": 'You havent login yet'}, status=status.HTTP_403_FORBIDDEN)
        instance = request.user
        serializer = self.get_serializer(instance)
        new_serializer = serializer.data
        # new_serializer['sale_reps'] = [model_to_dict(item) for item in serializer.data['sale_reps']]

        return Response(new_serializer)



class LoginAndUpdateView(generics.CreateAPIView, generics.UpdateAPIView):

    queryset = User.objects
    serializer_class = serializers.LoginAndUpdateSerializer

    def create(self, request, *args, **kwargs):
        # self.request.login_type = self.request.data.get('login_type')
        # self.request.login = True
        # from pprint import pprint
        # pprint(vars(request))
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = serializer.data
        # data['username'] = request.data['username']

        return Response(data, status=status.HTTP_200_OK, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        headers = self.get_success_headers(serializer.data)
        data = serializer.data
        # data['username'] = request.data['username']

        return Response(data, status=status.HTTP_200_OK, headers=headers)


@api_view(['GET'])
def LogoutView(request):
    logout(request)
    return Response({'msg': "Logout successfully"})


@api_view(['GET'])
def ActivateView(request):
    activate_token = request.query_params.get('activate_token')
    info = jwt.decode(activate_token[2:],
                      settings.SECRET_KEY, algorithms=['HS256'])
    User = get_user_model()
    try:
        user = User.objects.get(id=info['id'])
    except User.DoesNotExist:
        user = None
    if user is not None:
        user.is_active = True
        user.save()
        login(request, user)
        return Response('Thank you for your email confirmation, now you can login')
    else:
        return Response('Activation link is not valid')


class RegisterView(generics.CreateAPIView):
    serializer_class = serializers.RegisterSerializer

    def create(self, request, *args, **kwargs):
        # self.request.register = True
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        data = serializer.data

        data['username'] = request.data['username']

        return Response(data, status=status.HTTP_200_OK, headers=headers)

class UserView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects
    serializer_class = serializers.MeSerializer
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):

        serializer = self.get_serializer(self.get_queryset(), many=True)

        return Response({"data": serializer.data, "total": len(serializer.data)})


class SaleRepView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects
    serializer_class = serializers.MeSerializer
    http_method_names = ['get']

    def list(self, request):
        sale_reps = models.Profile.objects.filter(is_manager=False)
        sale_reps = [model_to_dict(item) for item in sale_reps]
        return Response(sale_reps, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_info(request):

    access_token = request.session.get('access_token')
    res = requests.get(
        'https://www.googleapis.com/gmail/v1/users/me/profile', headers={'Authorization': f'Bearer {access_token}'}).json()

    return res


@api_view(['GET', 'POST'])
def GmailExchangeCodeView(request):
    return Response({"data": request.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def GmailView(request):

    res = 'NOTHING'
    with open('client_secret.json', 'rb') as secret:
        cred = json.load(secret)
        res = exchange_code(
            request,
            request.data['code'], cred['web']['client_id'], cred['web']['client_secret'])
        request.session['access_token'] = res['access_token']

        request.session['refresh_token'] = res['refresh_token']
        pprint(vars(request.session))
    return Response({"data": res}, status=status.HTTP_200_OK)


class SendMessageView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        res = send_mail(request)

        return Response({"data": res}, status=status.HTTP_200_OK)

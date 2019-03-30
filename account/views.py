from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import logout 

from rest_framework import status, generics, viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view

from . import serializers

# Create your views here.


class MeView(generics.RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.MeSerializer

    def retrieve(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"msg": 'You havent login yet'}, status=status.HTTP_403_FORBIDDEN)
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


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
        serializer = self.get_serializer(instance, data=request.data, partial=True)
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

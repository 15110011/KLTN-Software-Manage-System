from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework import status
from .models import Step, StepDetail
from .serializers import StepSerializer, StepDetailSerializer
# Create your views here.


class StepView(ModelViewSet):
    queryset = Step.objects
    serializer_class = StepSerializer
    permission_classes = (IsAuthenticated,)


class StepDetailView(ModelViewSet):
    queryset = StepDetail.objects
    serializer_class = StepDetailSerializer
    permission_classes = (IsAuthenticated,)

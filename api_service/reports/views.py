from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from . import models
from . import serializers

# Create your views here.


class ReportView(ModelViewSet):
    queryset = models.Report.objects
    serializer_class = serializers.ReportSerializer

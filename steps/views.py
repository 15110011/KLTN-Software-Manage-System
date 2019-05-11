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

    def create(self, request):
        serializer_class = StepSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class StepDetailView(ModelViewSet):
    queryset = StepDetail.objects
    serializer_class = StepDetailSerializer
    permission_classes = (IsAuthenticated,)

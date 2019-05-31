from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from . import models
from . import serializers
from rest_framework.decorators import api_view, permission_classes, action, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from datetime import datetime, timedelta, timezone
from django.forms.models import model_to_dict
import pandas as pd
import xlrd


@api_view(['POST'])
@parser_classes((MultiPartParser, FormParser, ))
def upload_excel_contacts(request):
    print(request.data['file'])
    df = pd.read_excel(request.data['file'])
    print (df.columns)
    return Response({"message": "hi"})

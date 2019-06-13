from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from . import models
from . import serializers
from .state import reverse_state_hashes
from rest_framework.decorators import api_view, permission_classes, action, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from datetime import datetime, timedelta, timezone
from django.forms.models import model_to_dict
import pandas as pd
import xlrd
import json


@api_view(['POST'])
@parser_classes((MultiPartParser, FormParser, ))
def upload_excel_contacts(request):
    target_group = request.data.get('id', None)
    if target_group:
        groups = models.ContactGroup.objects.filter(
            id__in=target_group.split(',')).order_by('id')
        df = pd.read_excel(request.data['file'], header=1)
        contacts = []
        for d in df.values:
            try:
                cur_contact = {"first_name": d[0], "last_name": d[1], "mail": d[2], "phone": str(0)+str(d[3]), "sex": d[4].upper(
                ), "address": d[5], "country": 'USA', "state": reverse_state_hashes[d[6]], "city": d[7], "zipcode": d[8], "org": d[9], "user": request.user, 'groups': [groups[0].id]}
                serializer = serializers.ContactSerializer(
                    data=cur_contact, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                contacts.append(serializer.instance)
            except serializers.ValidationError as e:
                if serializer.errors.get('non_field_errors', None):
                    duplicated = models.Contact.objects.get(
                        first_name=d[0], last_name=d[1], user=request.user)
                    cur_contact['groups'] = duplicated.groups.all()
                    serializer = serializers.ContactSerializer(duplicated,
                                                               data=cur_contact, context={"request": request}, partial=True)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    contacts.append(serializer.instance)
                else:
                    return Response({"validation_erros": serializer.errors, "first_name": d[0], "last_name": d[1]}, status=status.HTTP_400_BAD_REQUEST)
            except: 
                duplicated = models.Contact.objects.get(
                        first_name=d[0], last_name=d[1], user=request.user)
                cur_contact['groups'] = duplicated.groups.all()
                serializer = serializers.ContactSerializer(duplicated,
                                                            data=cur_contact, context={"request": request}, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                contacts.append(serializer.instance)
        #default_group = models.ContactGroup.objects.get(id=target_group)
        #err_contacts = []
        for g in groups:
            g.contacts.add(*contacts)
        # if len(err_contacts):
        #    return Response({"errs": err_contacts}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "OK"})
    return Response({"errs": 'No Group id is provided'}, status=status.HTTP_400_BAD_REQUEST)

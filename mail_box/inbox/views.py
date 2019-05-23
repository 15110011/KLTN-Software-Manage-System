from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from . import serializers
from . import models
from .gmail_utils import GmailService
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
# Create your views here.


@api_view(['POST'])
def send_email(request):
    data = request.data.get('data', None)
    gmail = GmailService()
    mail = gmail.send_message(data)
    models.MailBox.objects.create(
        user_id=data['user_id'],
        message_id=mail['message_id'],
        thread_id=mail['thread_id'],
        email_type='SENT'
    )
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)('mailbox', {
        "type": "email.message",
        "thread_id": mail['thread_id']
    })
    return Response({"thread_id": mail['thread_id']})

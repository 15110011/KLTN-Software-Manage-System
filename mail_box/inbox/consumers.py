from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from .models import MailBox
from . import serializers


class MailBoxConsumer(AsyncJsonWebsocketConsumer):
    pass

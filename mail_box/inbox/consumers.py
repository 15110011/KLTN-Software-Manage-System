from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.forms.models import model_to_dict
from channels.db import database_sync_to_async
from django.core.cache import cache
from .models import MailBox
from . import serializers
from .gmail_utils import GmailService


class MailBoxConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.send_json({
            "message": "hi"
        })

    async def disconnect(self, close_code):
        pass

    async def receive_json(self, content):
        pass

    @database_sync_to_async
    def create_email(self, data):
        objects = [
            MailBox(
                user_id = d['user_id'],
                message_id = d['message_id'],
                message_history = d['message_history']
            )
            for d in data
        ]
        return MailBox.objects.bulk_create(objects)
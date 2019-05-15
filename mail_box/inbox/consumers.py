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
        gmail = GmailService()
        if cache.get(f'user_{self.user_id}') is not None:
            return await self.send_json({
                "data": cache.get(f'user_{self.user_id}')
            })
        user_email = await self.get_email_db(self.user_id)
        if len(user_email) == 0:
            return await self.send_json({
                "data": []
            })
        else:
            data = []
            for mail in user_email:
                email_details = gmail.get_message(mail['message_id'])
                data.append(email_details)
            cache.set(f'user_{self.user_id}', data, timeout=3600)
            return await self.send_json({
                "data": data
            })

    async def disconnect(self, close_code):
        pass

    async def receive_json(self, content):
        pass

    @database_sync_to_async
    def create_email_db(self, data):
        objects = [
            MailBox(
                user_id=d['user_id'],
                message_id=d['message_id'],
                message_history=d['message_history']
            )
            for d in data
        ]
        return MailBox.objects.bulk_create(objects)

    @database_sync_to_async
    def get_email_db(self, user_id):
        queryset = MailBox.objects.filter(user_id=user_id)
        data = serializers.MailBoxSerializer(queryset, many=True).data
        return data


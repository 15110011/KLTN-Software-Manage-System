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
        await self.channel_layer.group_add(
            'mailbox',
            self.channel_name
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            'mailbox',
            self.channel_name
        )
        self.close()

    async def receive_json(self, content):
        threads = content['threads']
        data = []
        for thread in threads:
            action_type = thread['type']
            print(thread)
            if action_type == 'Call Client':
                data.append(thread)
            else: 
                thread_id = thread['thread_id']
                if cache.get(f'user_{self.user_id}_thread_{thread_id}') is not None:
                    data.append(
                        cache.get(f'user_{self.user_id}_thread_{thread_id}'))
        await self.send_json({"data": data})

    async def email_message(self, event):
        gmail = GmailService()
        thread_id = event['thread_id']
        data = []
        if cache.get(f'user_{self.user_id}_thread_{thread_id}') is not None:
            cache.delete_pattern(f'user_{self.user_id}_thread_{thread_id}')
            messages = gmail.get_thread(event['thread_id'])
            cache.set(f'user_{self.user_id}_thread_{thread_id}', messages['messages'], timeout=None)
            data.append(messages['messages'])
        else:
            messages = gmail.get_thread(event['thread_id'])
            cache.set(f'user_{self.user_id}_thread_{thread_id}', messages['messages'], timeout=None)
            data.append(messages['messages'])
        await self.send_json({"data": data, "type": "single"})
        

    # @database_sync_to_async
    # def get_email_db(self, user_id):
    #     queryset = MailBox.objects.filter(
    #         user_id=user_id)
    #     data = [model_to_dict(d) for d in queryset]
    #     return data

    # @database_sync_to_async
    # def get_email_user_db(self, thread_id):
    #     queryset = MailBox.objects.filter(thread_id=thread_id)
    #     data = [model_to_dict(d) for d in queryset]
    #     return data

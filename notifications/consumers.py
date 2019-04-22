from django.contrib.auth import get_user_model
from channels.generic.websocket import AsyncWebsocketConsumer


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        await self.accept()
        await self.send('hello')
       

    async def disconnect(self, close_code):
        pass
    
    async def receive(self, text_data):
        print (text_data)
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.generic.websocket import WebsocketConsumer
from .models import Notification
import json
from . import serializers

class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        user_notifications = self.get_notifications(self.user_id)
        self.send(json.dumps({'notifications': user_notifications}))

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        print(text_data)

    def get_notifications(self, user_id):
        queryset = Notification.objects.filter(user=user_id)
        data = serializers.NotificationSerializer(queryset, many=True).data
        return data

    def create_notifications(self, data):
        pass    
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from .models import Notification
from . import serializers

class NotificationConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        user_notifications = self.get_notifications(self.user_id)
        self.send_json({'notifications': user_notifications})

    def disconnect(self, close_code):
        pass

    def receive_json(self, content, **kwargs):
        if content['type'] == 'update':
            notification = self.update_notifications(content['data'])
        if content['type'] == 'create':
            notification = self.create_notifications(content['data'])
        self.send_json({'notifications': notification})

    def get_notifications(self, user_id):
        queryset = Notification.objects.filter(user=user_id)
        data = serializers.NotificationSerializer(queryset, many=True).data
        return data

    def create_notifications(self, data):
        data['user'] = int(data['user'])
        new_notification = serializers.NotificationSerializer(data=data)
        new_notification.is_valid()
        new_notification.save()
        return new_notification.data

    def update_notifications(self, data):
        new_notification = []
        for notification in data:
            instance = Notification.objects.get(id=int(notification['id']))
            if not instance.is_seen:
                instance.is_seen = True
                instance.save()
            new_notification.append(model_to_dict(instance))
        return new_notification
            

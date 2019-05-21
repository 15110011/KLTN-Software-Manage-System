from django.apps import AppConfig
from django.forms.models import model_to_dict
from .gmail_utils import GmailService
from google.cloud import pubsub_v1
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json


class InboxConfig(AppConfig):
    name = 'inbox'
    verbose_name = "MailBox"

    def ready(self):
        from .consumers import MailBoxConsumer
        from .models import MailHistory
        subscriber = pubsub_v1.SubscriberClient()
        subscription_path = subscriber.subscription_path(
            'theaqvteam', 'mail-box')

        def callback(message):
            history_id = json.loads(str(message.data, 'utf-8'))['historyId']
            gmail = GmailService()
            mail = [model_to_dict(
                mail) for mail in MailHistory.objects.all().order_by('-created')[:1]]
            if len(mail) == 0:
                mail = MailHistory(history_id=history_id)
                mail.save()
                return
            history = gmail.get_history(mail[0]['history_id'], 'INBOX')
            if len(history['messages']) > 0:
                channel_layer = get_channel_layer()
                for email in history['messages']:
                    new_msg = gmail.get_message(email['message_id'])
                    async_to_sync(channel_layer.group_send)('mailbox', {
                        "type": "email.message",
                        "message": new_msg,
                        "thread_id": email['thread_id']
                    })
                mail = MailHistory(history_id=history_id)
                mail.save()
                message.ack()
        subscriber.subscribe(
            'projects/theaqvteam/subscriptions/mail-box', callback=callback)

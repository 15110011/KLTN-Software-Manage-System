from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import include, path
from inbox.consumers import MailBoxConsumer


application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    'websocket': URLRouter(
        [
            path('ws/mail-box/<int:user_id>', MailBoxConsumer)
        ]
    )
})

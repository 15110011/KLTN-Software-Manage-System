from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import include, path
from notifications import consumers

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    'websocket': URLRouter(
        [
            path('ws/notifications/<int:user_id>', consumers.NotificationConsumer)
        ]
    )
})
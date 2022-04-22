"""
ASGI config for chatter_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chatter_backend.routing

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatter_backend.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket':AuthMiddlewareStack(
        URLRouter(
            chatter_backend.routing.websocket_urlpatterns
        )
    )
})

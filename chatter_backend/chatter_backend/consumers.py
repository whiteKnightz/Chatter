import datetime
import json
import random
from uuid import UUID

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from webapp import models
from webapp import serializer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'test'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        correspondence = text_data_json['correspondence']
        chat_name = text_data_json['chat_name']
        chat = text_data_json['chat']
        gcs = list(chat['gcs'])
        chat_value = chat['chat']
        del chat['gcs']
        gcs.append(correspondence)
        chat_value['chats'] = gcs
        chat_value['chat_id'] = str(random.randint(1000000, 10000000)) if chat_value['chat_id'] is None else chat_value[
            'chat_id']
        if chat_value['chat_id']:
            chat1 = models.Chat.objects.filter(chat_id=chat_value['chat_id']).get()
            self.save_correspondence(chat1, correspondence)
            self.send_event(chat_name, chat1.chat_id)
        else:
            chat1 = models.Chat.objects.create(sender=chat_value['sender'], receiver=chat_value['receiver'])
            serializer1 = serializer.ChatSerializers(data=chat1)
            if serializer1.is_valid():
                serializer1.save()
            self.save_correspondence(chat1, correspondence)
            self.send_event(chat_name, chat1.chat_id)

    def save_correspondence(self, chat1, correspondence):
        correspondence1 = models.Correspondence.objects.create(
            created_date=datetime.datetime.now(),
            sender=correspondence['sender'],
            message=correspondence['message'],
            chat=chat1
        )
        serializer2 = serializer.CorrespondenceSerializers(data=correspondence1)
        if serializer2.is_valid():
            serializer2.save()

    def send_event(self, chat_name, chat_id):
        chat1 = models.Chat.objects.get(chat_id=chat_id)
        serializers1 = serializer.ChatSerializers(chat1, many=False)
        corr = chat1.correspondences.all()
        serializer2 = serializer.CorrespondenceSerializers(corr, many=True)
        chat = {'chat': serializers1.data, 'gcs': serializer2.data}

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'chat_name': chat_name,
                'chat': chat
            }
        )

    def chat_message(self, event):
        chat_name = event['chat_name']
        chat = event['chat']

        self.send(text_data=json.dumps({
            'type': 'chat',
            'chat_name': chat_name,
            'chat': chat
        }, cls=UUIDEncoder))


class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return obj.hex
        return json.JSONEncoder.default(self, obj)

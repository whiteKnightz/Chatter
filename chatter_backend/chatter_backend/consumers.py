import json
import random

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import datetime


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
        correspondence['created_date'] = str(datetime.datetime.now())
        chat_name = text_data_json['chat_name']
        chat = text_data_json['chat']
        print(chat['gcs'])
        gcs = list(chat['gcs'])
        chat_value = chat['chat']
        del chat['gcs']
        gcs.append(correspondence)
        chat_value['chats'] = gcs
        chat_value['chat_id'] = str(random.randint(1000000, 10000000)) if chat_value['chat_id'] is None else chat_value[
            'chat_id']

        print(f'\n\n\nMessage is: \"{correspondence}\"')
        print(f'\n\n\nChat Name is: \"{chat_name}\"')
        print(f'\n\n\nChat is: \"{chat}\"')
        print(f'\n\n\nchat_value is: \"{chat_value}\"')

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': correspondence,
                'chat_name': chat_name,
                'chat': chat_value
            }
        )

    def chat_message(self, event):
        chat_name = event['chat_name']
        chat = event['chat']

        self.send(text_data=json.dumps({
            'type': 'chat',
            'chat_name': chat_name,
            'chat': chat
        }))

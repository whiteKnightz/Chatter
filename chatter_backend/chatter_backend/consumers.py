import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


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
        message = text_data_json['message']
        chat_name = text_data_json['chat_name']

        print(f'\n\n\nMessage is: \"{message}\"')
        print(f'\n\n\nChat Name is: \"{chat_name}\"')

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'chat_name': chat_name
            }
        )

    def chat_message(self, event):
        message = event['message']
        chat_name = event['chat_name']

        self.send(text_data=json.dumps({
            'type': 'chat',
            'message': message,
            'chat_name': chat_name
        }))

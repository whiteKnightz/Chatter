from rest_framework import serializers
from .models import *


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('username', 'name', 'password')
        fields = '__all__'


class ChatSerializers(serializers.ModelSerializer):
    class Meta:
        model = Chat
        # fields = ('username', 'name', 'password')
        fields = '__all__'


class CorrespondenceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Correspondence
        # fields = ('username', 'name', 'password')
        fields = '__all__'

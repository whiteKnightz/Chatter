from rest_framework import serializers
from .models import *


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('username', 'name', 'password')
        fields = '__all__'

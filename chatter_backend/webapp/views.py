from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *


# Create your views here.
class UserList(APIView):

    def get(self, request):
        user1 = User.objects.all()
        serializers1 = UserSerializers(user1, many=True)
        return Response(serializers1.data)


class Signup(APIView):
    def post(self, request):
        serializer1 = UserSerializers(data=request.data)
        if serializer1.is_valid():
            serializer1.save()
            return Response({"status": "success", "data": serializer1.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer1.errors}, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    def post(self, request):
        user1 = User.objects.filter(username=request.data['username']).filter(password=request.data['password'])
        if user1.get().username == request.data['username']:
            return Response({"status": "success",
                             "data": {
                                 "Authenticated": True,
                                 "username": user1.get().username,
                                 "name": user1.get().name
                             }},
                            status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": "Invalid Login"}, status=status.HTTP_400_BAD_REQUEST)


class ChatApi(APIView):
    def get(self, request):
        chat1 = Chat.objects.all()
        serializers1 = ChatSerializers(chat1, many=True)
        return Response(serializers1.data)

    def post(self, request):
        pass

class CorrespondenceApi(APIView):
    def get(self, request):
        chat1 = Correspondence.objects.all()
        serializers1 = CorrespondenceSerializers(chat1, many=True)
        return Response(serializers1.data)

    def post(self, request):
        pass

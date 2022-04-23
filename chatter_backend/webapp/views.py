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
    def get(self, request, chat_id=None):
        if chat_id is None:
            chat1 = Chat.objects.all()
            serializers1 = ChatSerializers(chat1, many=True)
            response = {'chat': serializers1.data}
            for cha in chat1:
                corr = Correspondence.objects.filter(chat=cha)
                response[str(cha.chat_id)] = CorrespondenceSerializers(corr.all(), many=True).data
            return Response(response)
        else:
            chat1 = Chat.objects.get(chat_id=chat_id)
            serializers1 = ChatSerializers(chat1, many=False)
            corr=chat1.correspondences.all()
            serializer2=CorrespondenceSerializers(corr,many=True)
            return Response({'chat':serializers1.data,'gcs':serializer2.data})

    def post(self, request):
        pass


class CorrespondenceApi(APIView):
    def get(self, request):
        chat1 = Correspondence.objects.all()
        serializers1 = CorrespondenceSerializers(chat1, many=True)
        return Response(serializers1.data)

    def post(self, request):
        pass


class ChatByPersonsApi(APIView):
    def get(self, request, username=None):
        if username is not None:
            chat1 = Chat.objects.raw('SELECT * FROM CHAT WHERE chat.receiver IN (%s) OR sender IN (%s)',
                                     [username, username])
            serializers1 = ChatSerializers(chat1, many=True)
            if len(serializers1.data) > 0:
                response = {'chat': serializers1.data}
                for cha in chat1:
                    corr = Correspondence.objects.filter(chat=cha)
                    response[str(cha.chat_id)] = CorrespondenceSerializers(corr.all(), many=True).data
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({"status": "success", "data": None}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": 'serializer1.errors'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        person_array = request.data
        if person_array is not None:
            person1 = person_array[0]
            person2 = person_array[1]
            chat1 = Chat.objects.raw('SELECT * FROM CHAT WHERE chat.receiver IN (%s, %s) AND sender IN (%s, %s)',[person1,person2,person1,person2])
            serializers1 = ChatSerializers(chat1, many=True)
            if len(serializers1.data) > 0:
                response = {'chat': serializers1.data[0]}
                for cha in chat1:
                    corr = Correspondence.objects.filter(chat=cha)
                    response['gcs'] = CorrespondenceSerializers(corr.all(), many=True).data
                return Response({"status": "success", "data": response}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "success", "data": None}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": 'serializer1.errors'}, status=status.HTTP_400_BAD_REQUEST)

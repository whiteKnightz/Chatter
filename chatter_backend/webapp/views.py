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

    def post(self, request):
        serializer1 = UserSerializers(data=request.data)
        if serializer1.is_valid():
            serializer1.save()
            return Response({"status": "success", "data": serializer1.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer1.errors}, status=status.HTTP_400_BAD_REQUEST)

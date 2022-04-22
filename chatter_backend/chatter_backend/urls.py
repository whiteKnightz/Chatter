"""chatter_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from webapp import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', views.Login.as_view()),
    path('api/auth/signup/', views.Signup.as_view()),
    path('api/user/', views.UserList.as_view()),
    path('api/chat/<str:chat_id>/', views.ChatApi.as_view()),
    path('api/chat/search/byPerson/', views.ChatByPersonsApi.as_view()),
    path('api/chat/search/byPerson/<str:username>/', views.ChatByPersonsApi.as_view()),
    path('api/correspondence/', views.CorrespondenceApi.as_view()),
]

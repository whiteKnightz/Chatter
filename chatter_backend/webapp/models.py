from django.contrib.postgres.fields import ArrayField
from django.db import models
import uuid
import datetime


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'users'

    def __str__(self):
        return f'{self.name}-{self.username}'


class Chat(models.Model):
    chat_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.CharField(max_length=15)
    receiver = models.CharField(max_length=15)

    class Meta:
        managed = True
        db_table = 'chat'

    def __str__(self):
        return f'{self.sender} sent the chat to {self.receiver} with id {self.chat_id}'


class Correspondence(models.Model):
    correspondence_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_date = models.DateTimeField(default=datetime.datetime.now, blank=True)
    sender = models.CharField(max_length=15, default="")
    message = models.TextField(default="")
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="correspondences")

    class Meta:
        managed = True
        db_table = 'correspondence'

    def __str__(self):
        return f'{self.sender} sent \"{self.message}\" on {self.created_date} with id {self.correspondence_id}'

from rest_framework import serializers
from ..models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['message_id', 'content', 'timestamp', 'user', 'room']

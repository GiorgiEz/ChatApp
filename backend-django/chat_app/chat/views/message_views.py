from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from ..models import Message, Room
from ..serializers.message_serializer import MessageSerializer

class MessageListView(APIView):
    """Retrieve all messages or create a new message."""

    def get(self, request):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Message was sent successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RoomMessageListView(APIView):
    """Retrieve all messages for a specific room."""

    def get(self, request, room_id):
        room = get_object_or_404(Room, room_id=room_id)
        messages = Message.objects.filter(room=room).order_by('-timestamp')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

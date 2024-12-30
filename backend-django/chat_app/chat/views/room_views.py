from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Room
from ..serializers.room_serializer import RoomSerializer

from django.shortcuts import get_object_or_404


class RoomListView(APIView):
    """Get all rooms or create a new room."""

    def get(self, request):
        rooms = Room.objects.all().order_by('-timestamp')
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Room added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRoomListView(APIView):
    """Get all rooms for a specific user by user_id."""

    def get(self, request, user_id):
        rooms = Room.objects.filter(user_id=user_id).order_by('-timestamp')
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


class RoomDetailView(APIView):
    """Get, update, or delete a room by room_id."""

    def get(self, request, room_id):
        room = get_object_or_404(Room, room_id=room_id)
        serializer = RoomSerializer(room)
        return Response(serializer.data)

    def put(self, request, room_id):
        room = get_object_or_404(Room, room_id=room_id)
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Room updated successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, room_id):
        room = get_object_or_404(Room, room_id=room_id)
        room.delete()
        return Response({"message": "Room deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

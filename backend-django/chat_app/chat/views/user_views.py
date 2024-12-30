from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ..serializers.user_serializer import UserSerializer
from django.shortcuts import get_object_or_404


class UserListView(APIView):
    """Retrieve all users or create a new user."""

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    """Retrieve, update, or delete a user by ID or username."""

    def get(self, request, identifier):
        # Check if identifier is numeric (user_id) or a string (username)
        if identifier.isdigit():
            user = get_object_or_404(User, id=identifier)
        else:
            user = get_object_or_404(User, username=identifier)

        serializer = UserSerializer(user)
        return Response(serializer.data)

    def delete(self, request, identifier):
        if identifier.isdigit():
            user = get_object_or_404(User, id=identifier)
        else:
            user = get_object_or_404(User, username=identifier)

        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

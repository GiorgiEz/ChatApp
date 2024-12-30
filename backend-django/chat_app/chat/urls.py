from django.urls import path
from .views.user_views import UserListView, UserDetailView
from .views.room_views import RoomListView, RoomDetailView, UserRoomListView
from .views.message_views import MessageListView, RoomMessageListView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<str:identifier>/', UserDetailView.as_view(), name='user-detail'),

    path('rooms/', RoomListView.as_view(), name='room-list'),
    path('rooms/user=<int:user_id>/', UserRoomListView.as_view(), name='user-room-list'),
    path('rooms/room=<int:room_id>/', RoomDetailView.as_view(), name='room-detail'),

    path('messages/', MessageListView.as_view(), name='message-list'),
    path('messages/<int:room_id>/', RoomMessageListView.as_view(), name='room-message-list'),
]

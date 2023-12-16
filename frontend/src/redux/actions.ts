import {RoomType, UserType} from "../utils/Types";

export const setUsers = (users: UserType[]) => ({
    type: 'SET_USERS',
    payload: users,
});

export const setRooms = (rooms: RoomType[]) => ({
    type: 'SET_ROOMS',
    payload: rooms,
});

export const setLockedRoom = (room: RoomType | false) => ({
    type: "SET_LOCKED_ROOM",
    payload: room,
})

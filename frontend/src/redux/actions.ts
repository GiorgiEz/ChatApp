import {RoomType, UserType} from "../utils/Types";

export const setUsers = (users: UserType[]) => ({
    type: 'SET_USERS',
    payload: users,
});

export const setRooms = (rooms: RoomType[]) => ({
    type: 'SET_ROOMS',
    payload: rooms,
});

import {RoomType, UserType} from "../utils/Types";

export interface UserState {
    readonly users: UserType[];
}
export type UserActionType =
    | { type: "SET_USERS"; payload: UserType[]}


export interface RoomState {
    readonly rooms: RoomType[];
    readonly lockedRoom: RoomType | false;
}
export type RoomActionType =
    | { type: "SET_ROOMS"; payload: RoomType[]}
    | { type: "SET_LOCKED_ROOM"; payload: RoomType | false}

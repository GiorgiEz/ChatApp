import {RoomType, UserType} from "../utils/Types";

export interface UserState {
    readonly users: UserType[];
}

export type UserActionType =
    | { type: "SET_USERS"; payload: UserType[]}


export interface RoomState {
    readonly rooms: RoomType[];
}

export type RoomActionType =
    | { type: "SET_ROOMS"; payload: RoomType[]}

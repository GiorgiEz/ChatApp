import {RoomActionType, RoomState} from "./redux-types";

const initialState: RoomState = {
    rooms: [],
    lockedRoom: false,
}

export const RoomReducer = (state = initialState, action: RoomActionType) => {
    switch (action.type){
        case "SET_ROOMS": return {...state, rooms: action.payload}
        case "SET_LOCKED_ROOM": return {...state, lockedRoom: action.payload}
        default:
            return state;
    }
}
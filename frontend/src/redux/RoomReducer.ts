import {RoomActionType, RoomState} from "./redux-types";

const initialState: RoomState = {
    rooms: [],
}

export const RoomReducer = (state = initialState, action: RoomActionType) => {
    switch (action.type){
        case "SET_ROOMS":
            return {...state, rooms: action.payload}
        default:
            return state;
    }
}
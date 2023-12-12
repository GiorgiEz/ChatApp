import {UserActionType, UserState} from "./redux-types";

const initialState: UserState = {
    users: [],
}

export const UserReducer = (state = initialState, action: UserActionType) => {
    switch (action.type){
        case "SET_USERS":
            return {...state, users: action.payload}
        default:
            return state;
    }
}

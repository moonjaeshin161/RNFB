import { types } from "./action";

const initialState = {
    users: [],
}

export const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_LIST: return { ...state, users: [...state.users, action.payload] }
        default: return state;
    }
}
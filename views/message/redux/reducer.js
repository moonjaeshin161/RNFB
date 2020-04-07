import { types } from "./action";

const initialState = {
    rooms: [],
}

export const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ROOM_LIST: return { ...state, rooms: [...state.rooms, action.payload] }
        default: return state;
    }
}
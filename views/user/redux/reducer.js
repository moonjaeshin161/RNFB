import { types } from "./actions";

const initialState = {
    user: {}
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER_INFO: return { ...state, user: action.payload };
        case types.UPDATE_USER_INFO: return { ...state, user: { ...state.user, ...action.payload } };

        default: return { ...state }
    }
}

export default UserReducer;
import { types } from "./actions";

const initialState = {
    isLogin: false,
    test: '1'
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return { ...state };
        case types.LOGIN_SUCCESS:
            return { ...state, isLogin: true };
        case types.LOGIN_ERROR:
            return { ...state, isLogin: false };
        case types.LOG_OUT:
            return { ...state };
        case types.LOG_OUT_SUCCESS:
            return { ...state, isLogin: false };
        case types.LOG_OUT_ERROR:
            return { ...state, isLogin: true }

        default:
            return { ...state };
    }
}

export default AuthReducer;
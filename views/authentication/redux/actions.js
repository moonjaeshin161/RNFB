export const types = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOG_OUT: 'LOG_OUT',
    LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
    LOG_OUT_ERROR: 'LOG_OUT_ERROR',
}

export function login() {
    return {
        type: types.LOGIN
    }
}

export function loginSuccess() {
    return {
        type: types.LOGIN_SUCCESS
    }
}

export function loginError() {
    return {
        type: types.LOGIN_ERROR
    }
}

export function logOut() {
    return {
        type: types.LOG_OUT
    }
}

export function logOutSuccess() {
    return {
        type: types.LOG_OUT_SUCCESS
    }
}

export function logOutError() {
    return {
        type: types.LOG_OUT_ERROR
    }
}
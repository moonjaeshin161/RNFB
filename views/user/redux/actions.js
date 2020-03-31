export const types = {
    SET_USER_INFO: 'SET_USER_INFO',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
}

export function setUserInfo(user) {
    return {
        type: types.SET_USER_INFO,
        payload: user
    }
}

export function updateUserInfo(updateInfo) {
    return {
        type: types.UPDATE_USER_INFO,
        payload: updateInfo
    }
}
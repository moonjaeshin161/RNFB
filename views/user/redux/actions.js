export const types = {
    GET_USER_INFO: 'GET_USER_INFO',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
}

export function getUserInfo(user) {
    return {
        type: types.GET_USER_INFO,
        payload: user
    }
}

export function updateUserInfo(updateInfo) {
    return {
        type: types.UPDATE_USER_INFO,
        payload: updateInfo
    }
}
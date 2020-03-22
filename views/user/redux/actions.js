export const types = {
    GET_USER_INFO: 'GET_USER_INFO'
}

export function getUserInfo(user) {
    return {
        type: types.GET_USER_INFO,
        payload: user
    }
}
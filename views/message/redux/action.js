export const types = {
    GET_USER_LIST: 'GET_USER_LIST',
}

export function getUserList(user) {
    return {
        type: types.GET_USER_LIST,
        payload: user
    }
}
export const types = {
    GET_ROOM_LIST: 'GET_ROOM_LIST',
}

export function getRoomList(rooms) {
    return {
        type: types.GET_ROOM_LIST,
        payload: rooms
    }
}
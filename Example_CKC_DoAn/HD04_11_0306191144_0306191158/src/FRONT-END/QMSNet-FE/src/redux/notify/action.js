export const GET_NOTIFY = 'GET_NOTIFY';
export const READ_NOTIFY = 'READ_NOTIFY';
export const UNREAD_NOTIFY = 'UNREAD_NOTIFY';
export const DELETE_NOTIFY = 'DELETE_NOTIFY';
export const READ_NOTIFY_ALL = 'READ_NOTIFY_ALL';
export const GET_NOTIFY_SUCCESS = 'GET_NOTIFY_SUCCESS';
export const NOTIFY_FAILED = 'NOTIFY_FAILED';
export const getNotify = (payload) => ({
    type: GET_NOTIFY,
    payload: payload
})
export const getNotifySuccess = (payload) => ({
    type: GET_NOTIFY_SUCCESS,
    payload: payload
})
export const readNotify = (payload) => ({
    type: READ_NOTIFY,
    payload: payload
})
export const unreadNotify = (payload) => ({
    type: UNREAD_NOTIFY,
    payload: payload
})
export const deleteNotify = (payload) => ({
    type: DELETE_NOTIFY,
    payload: payload
})
export const readNotifyAll = (payload) => ({
    type: READ_NOTIFY_ALL,
    payload: payload
})
export const notifyFailed = (payload) => ({
    type: NOTIFY_FAILED,
    payload: payload
})

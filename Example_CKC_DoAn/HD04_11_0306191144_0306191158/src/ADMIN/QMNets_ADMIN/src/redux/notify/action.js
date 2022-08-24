import {
    ADD_NOTIFY,
    ADD_NOTIFY_SUCCESS,
    DELETE_NOTIFY,
    EDIT_NOTIFY,
    GET_ALL_NOTIFY,
    GET_ALL_NOTIFY_SUCCESS,
    HIDE_LOADING_NOTIFY,
} from '../../constants/ActionTypes';

export const SUCCESS = 'SUCCESS';

export function getAllNotifyBasic(payload) {
    return {
        type: GET_ALL_NOTIFY,
        payload,
    };
}
export function setNotifySuccess(payload) {
    return {
        type: SUCCESS,
        payload,
    };
}
export function getAllNotifyBasicSuccess(payload) {
    return { type: GET_ALL_NOTIFY_SUCCESS, payload };
}

export function addNotify(payload) {
    return { type: ADD_NOTIFY, payload };
}
export function addNotifySuccess(payload) {
    return { type: ADD_NOTIFY_SUCCESS, payload };
}

export function deleteNotify(payload) {
    return { type: DELETE_NOTIFY, payload };
}

export function editNotify(payload) {
    return { type: EDIT_NOTIFY, payload };
}

export function hiddenLoading() {
    return { type: HIDE_LOADING_NOTIFY };
}

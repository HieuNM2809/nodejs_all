import {
    ADD_USER,
    ADD_USER_SUCCESS,
    DELETE_USER,
    EDIT_USER,
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    HIDE_LOADING,
} from '../../constants/ActionTypes';

export const SUCCESS = 'SUCCESS';

export function getAllUserBasic(payload) {
    return {
        type: GET_ALL_USER,
        payload,
    };
}
export function setUserSuccess(payload) {
    return {
        type: SUCCESS,
        payload,
    };
}
export function getAllUserBasicSuccess(payload) {
    return { type: GET_ALL_USER_SUCCESS, payload };
}

export function addUser(payload) {
    return { type: ADD_USER, payload };
}
export function addUserSuccess(payload) {
    return { type: ADD_USER_SUCCESS, payload };
}

export function deleteUser(payload) {
    return { type: DELETE_USER, payload };
}

export function editUser(payload) {
    return { type: EDIT_USER, payload };
}

export function hiddenLoading() {
    return { type: HIDE_LOADING };
}

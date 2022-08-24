import {
    ADD_POSTSTYLE,
    ADD_POSTSTYLE_SUCCESS,
    DELETE_POSTSTYLE,
    EDIT_POSTSTYLE,
    GET_ALL_POSTSTYLE,
    GET_ALL_POSTSTYLE_SUCCESS,
    HIDE_LOADING_POSTSTYLE,
} from '../../constants/ActionTypes';

export const SUCCESS = 'SUCCESS';

export function getAllPostStyleBasic(payload) {
    return {
        type: GET_ALL_POSTSTYLE,
        payload,
    };
}
export function setPostStyleSuccess(payload) {
    return {
        type: SUCCESS,
        payload,
    };
}
export function getAllPostStyleBasicSuccess(payload) {
    return { type: GET_ALL_POSTSTYLE_SUCCESS, payload };
}

export function addPostStyle(payload) {
    return { type: ADD_POSTSTYLE, payload };
}
export function addPostStyleSuccess(payload) {
    return { type: ADD_POSTSTYLE_SUCCESS, payload };
}

export function deletePostStyle(payload) {
    return { type: DELETE_POSTSTYLE, payload };
}

export function editPostStyle(payload) {
    return { type: EDIT_POSTSTYLE, payload };
}

export function hiddenLoading() {
    return { type: HIDE_LOADING_POSTSTYLE };
}

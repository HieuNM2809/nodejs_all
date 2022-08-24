import {
    ADD_POST,
    ADD_POST_SUCCESS,
    DELETE_POST,
    EDIT_POST,
    GET_ALL_POST,
    GET_ALL_POST_SUCCESS,
    HIDE_LOADING_POST,
} from '../../constants/ActionTypes';

export const SUCCESS = 'SUCCESS';

export function getAllPostBasic(payload) {
    return {
        type: GET_ALL_POST,
        payload,
    };
}
export function setPostSuccess(payload) {
    return {
        type: SUCCESS,
        payload,
    };
}
export function getAllPostBasicSuccess(payload) {
    return { type: GET_ALL_POST_SUCCESS, payload };
}

export function addPost(payload) {
    return { type: ADD_POST, payload };
}
export function addPostSuccess(payload) {
    return { type: ADD_POST_SUCCESS, payload };
}

export function deletePost(payload) {
    return { type: DELETE_POST, payload };
}

export function editPost(payload) {
    return { type: EDIT_POST, payload };
}

export function hiddenLoading() {
    return { type: HIDE_LOADING_POST };
}

import {
    ADD_COMMENT,
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT,
    EDIT_COMMENT,
    GET_ALL_COMMENT,
    GET_ALL_COMMENT_SUCCESS,
    HIDE_LOADING_COMMENT,
} from '../../constants/ActionTypes';

export const SUCCESS = 'SUCCESS';

export function getAllCommentBasic(payload) {
    return {
        type: GET_ALL_COMMENT,
        payload,
    };
}
export function setCommentSuccess(payload) {
    return {
        type: SUCCESS,
        payload,
    };
}
export function getAllCommentBasicSuccess(payload) {
    return { type: GET_ALL_COMMENT_SUCCESS, payload };
}

export function addComment(payload) {
    return { type: ADD_COMMENT, payload };
}
export function addCommentSuccess(payload) {
    return { type: ADD_COMMENT_SUCCESS, payload };
}

export function deleteComment(payload) {
    return { type: DELETE_COMMENT, payload };
}

export function editComment(payload) {
    return { type: EDIT_COMMENT, payload };
}

export function hiddenLoading() {
    return { type: HIDE_LOADING_COMMENT };
}

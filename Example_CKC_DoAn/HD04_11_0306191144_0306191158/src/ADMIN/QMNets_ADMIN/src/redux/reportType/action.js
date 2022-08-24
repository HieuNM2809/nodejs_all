import {
    ADD_REPORTTYPE,
    ADD_REPORTTYPE_SUCCESS,
    DELETE_REPORTTYPE,
    EDIT_REPORTTYPE,
    GET_ALL_REPORTTYPE,
    GET_ALL_REPORTTYPE_SUCCESS,
    HIDE_LOADING_REPORTTYPE,
} from '../../constants/ActionTypes';

export const SUCCESS = 'SUCCESS';

export function getAllReportTypeBasic(payload) {
    return {
        type: GET_ALL_REPORTTYPE,
        payload,
    };
}
export function setReportTypeSuccess(payload) {
    return {
        type: SUCCESS,
        payload,
    };
}
export function getAllReportTypeBasicSuccess(payload) {
    return { type: GET_ALL_REPORTTYPE_SUCCESS, payload };
}

export function addReportType(payload) {
    return { type: ADD_REPORTTYPE, payload };
}
export function addReportTypeSuccess(payload) {
    return { type: ADD_REPORTTYPE_SUCCESS, payload };
}

export function deleteReportType(payload) {
    return { type: DELETE_REPORTTYPE, payload };
}

export function editReportType(payload) {
    return { type: EDIT_REPORTTYPE, payload };
}

export function hiddenLoading() {
    return { type: HIDE_LOADING_REPORTTYPE };
}

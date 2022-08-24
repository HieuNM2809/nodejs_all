import {
    ADD_REPORT,
    ADD_REPORT_SUCCESS,
    DELETE_REPORT,
    EDIT_REPORT,
    GET_ALL_REPORT,
    GET_ALL_REPORT_SUCCESS,
    HIDE_LOADING_REPORT,
} from '../../constants/ActionTypes';

export const SUCCESS = 'SUCCESS';

export function getAllReportBasic(payload) {
    return {
        type: GET_ALL_REPORT,
        payload,
    };
}
export function setReportSuccess(payload) {
    return {
        type: SUCCESS,
        payload,
    };
}
export function getAllReportBasicSuccess(payload) {
    return { type: GET_ALL_REPORT_SUCCESS, payload };
}

export function addReport(payload) {
    return { type: ADD_REPORT, payload };
}
export function addReportSuccess(payload) {
    return { type: ADD_REPORT_SUCCESS, payload };
}

export function deleteReport(payload) {
    return { type: DELETE_REPORT, payload };
}

export function editReport(payload) {
    return { type: EDIT_REPORT, payload };
}

export function hiddenLoading() {
    return { type: HIDE_LOADING_REPORT };
}

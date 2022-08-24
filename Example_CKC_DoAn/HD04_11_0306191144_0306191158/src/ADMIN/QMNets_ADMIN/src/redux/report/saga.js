import { message } from 'antd';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_REPORT, DELETE_REPORT, EDIT_REPORT, GET_ALL_REPORT, GET_ALL_REPORT_SUCCESS } from '../../constants/ActionTypes';
import callAPi from '../../utils/apiRequest';
import { toggleModal } from '../app/action';
import { hiddenLoading, setReportSuccess } from './action';

export const ReportsAPIRequest = async (url = '', data, method = 'get') =>
    await callAPi('admin/reports' + url, method, data,);

function* HandleGetReportsBasic(action) {
    try {
        const response = yield call(
            ReportsAPIRequest,
            '/getAll',
            action.payload || { page: null, limit: null, filter: [] },
            'post'
        );

        if (response.success) {
            yield put({ type: GET_ALL_REPORT_SUCCESS, payload: response.data });
        } else {
            yield put(hiddenLoading());
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message)
    }
}
export function* getReportsBasic() {
    yield takeEvery(GET_ALL_REPORT, HandleGetReportsBasic);
}

export function* handleCRUDReport(action) {
    try {
        const res = yield call(ReportsAPIRequest, action.payload?.url, action.payload?.data, action.payload?.method);
        if (res.success) {
            yield put(toggleModal(null));
            yield fork(message.success, res.message);
            yield put(setReportSuccess());
        } else {
            throw new Error(res.message);
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message);
    }
}

export function* CRUDReport() {
    yield takeEvery([ADD_REPORT, EDIT_REPORT, DELETE_REPORT], handleCRUDReport);
}

export default function* rootSaga() {
    yield all([fork(getReportsBasic), fork(CRUDReport)]);
}

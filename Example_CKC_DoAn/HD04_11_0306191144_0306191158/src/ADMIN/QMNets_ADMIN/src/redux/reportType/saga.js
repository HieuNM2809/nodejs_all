import { message } from 'antd';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_REPORTTYPE, DELETE_REPORTTYPE, EDIT_REPORTTYPE, GET_ALL_REPORTTYPE, GET_ALL_REPORTTYPE_SUCCESS } from '../../constants/ActionTypes';
import callAPi from '../../utils/apiRequest';
import { toggleModal } from '../app/action';
import { hiddenLoading, setReportTypeSuccess } from './action';

export const ReportTypesAPIRequest = async (url = '', data, method = 'get') =>
    await callAPi('admin/reportTypes' + url, method, data,);

function* HandleGetReportTypesBasic(action) {
    try {
        const response = yield call(
            ReportTypesAPIRequest,
            '/getAll',
            action.payload || { page: null, limit: null, filter: [] },
            'post'
        );

        if (response.success) {
            yield put({ type: GET_ALL_REPORTTYPE_SUCCESS, payload: response.data });
        } else {
            yield put(hiddenLoading());
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message)
    }
}
export function* getReportTypesBasic() {
    yield takeEvery(GET_ALL_REPORTTYPE, HandleGetReportTypesBasic);
}

export function* handleCRUDReportType(action) {
    try {
        const res = yield call(ReportTypesAPIRequest, action.payload?.url, action.payload?.data, action.payload?.method);
        if (res.success) {
            yield put(toggleModal(null));
            yield fork(message.success, res.message);
            yield put(setReportTypeSuccess());
        } else {
            throw new Error(res.message);
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message);
    }
}

export function* CRUDReportType() {
    yield takeEvery([ADD_REPORTTYPE, EDIT_REPORTTYPE, DELETE_REPORTTYPE], handleCRUDReportType);
}

export default function* rootSaga() {
    yield all([fork(getReportTypesBasic), fork(CRUDReportType)]);
}

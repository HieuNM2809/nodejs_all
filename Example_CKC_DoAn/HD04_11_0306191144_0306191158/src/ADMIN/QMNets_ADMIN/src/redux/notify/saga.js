import { message } from 'antd';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_NOTIFY, DELETE_NOTIFY, EDIT_NOTIFY, GET_ALL_NOTIFY, GET_ALL_NOTIFY_SUCCESS } from '../../constants/ActionTypes';
import callAPi from '../../utils/apiRequest';
import { toggleModal } from '../app/action';
import { hiddenLoading, setNotifySuccess, setNotifyuccess } from './action';

export const NotifyAPIRequest = async (url = '', data, method = 'get') =>
    await callAPi('admin/notifies' + url, method, data,);

function* HandleGetNotifyBasic(action) {
    try {
        const response = yield call(
            NotifyAPIRequest,
            '/getAll',
            action.payload || { page: null, limit: null, filter: [] },
            'post'
        );

        if (response.success) {
            yield put({ type: GET_ALL_NOTIFY_SUCCESS, payload: response.data });
        } else {
            yield put(hiddenLoading());
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message)
    }
}
export function* getNotifyBasic() {
    yield takeEvery(GET_ALL_NOTIFY, HandleGetNotifyBasic);
}

export function* handleCRUDNotify(action) {
    try {
        const res = yield call(NotifyAPIRequest, action.payload?.url, action.payload?.data, action.payload?.method);
        if (res.success) {
            yield put(toggleModal(null));
            yield fork(message.success, res.message);
            yield put(setNotifySuccess());
        } else {
            throw new Error(res.message);
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message);
    }
}

export function* CRUDNotify() {
    yield takeEvery([ADD_NOTIFY, EDIT_NOTIFY, DELETE_NOTIFY], handleCRUDNotify);
}

export default function* rootSaga() {
    yield all([fork(getNotifyBasic), fork(CRUDNotify)]);
}

import { message } from 'antd';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_POSTSTYLE, DELETE_POSTSTYLE, EDIT_POSTSTYLE, GET_ALL_POSTSTYLE, GET_ALL_POSTSTYLE_SUCCESS } from '../../constants/ActionTypes';
import callAPi from '../../utils/apiRequest';
import { toggleModal } from '../app/action';
import { hiddenLoading, setPostStyleSuccess } from './action';

export const PostStylesAPIRequest = async (url = '', data, method = 'get') =>
    await callAPi('admin/postStyles' + url, method, data,);

function* HandleGetPostStylesBasic(action) {
    try {
        const response = yield call(
            PostStylesAPIRequest,
            '/getAll',
            action.payload || { page: null, limit: null, filter: [] },
            'post'
        );

        if (response.success) {
            yield put({ type: GET_ALL_POSTSTYLE_SUCCESS, payload: response.data });
        } else {
            yield put(hiddenLoading());
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message)
    }
}
export function* getPostStylesBasic() {
    yield takeEvery(GET_ALL_POSTSTYLE, HandleGetPostStylesBasic);
}

export function* handleCRUDPostStyle(action) {
    try {
        const res = yield call(PostStylesAPIRequest, action.payload?.url, action.payload?.data, action.payload?.method);
        if (res.success) {
            yield put(toggleModal(null));
            yield fork(message.success, res.message);
            yield put(setPostStyleSuccess());
        } else {
            throw new Error(res.message);
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message);
    }
}

export function* CRUDPostStyle() {
    yield takeEvery([ADD_POSTSTYLE, EDIT_POSTSTYLE, DELETE_POSTSTYLE], handleCRUDPostStyle);
}

export default function* rootSaga() {
    yield all([fork(getPostStylesBasic), fork(CRUDPostStyle)]);
}

import { message } from 'antd';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_USER, DELETE_USER, EDIT_USER, GET_ALL_USER, GET_ALL_USER_SUCCESS } from '../../constants/ActionTypes';
import callAPi from '../../utils/apiRequest';
import { toggleModal } from '../app/action';
import { getAllUserBasic, hiddenLoading, setUserSuccess } from './action';

export const UsersAPIRequest = async (url = '', data, method = 'get') =>
    await callAPi('admin/users' + url, method, data,);

function* HandleGetUsersBasic(action) {
    try {
        const response = yield call(
            UsersAPIRequest,
            '/getAll',
            action.payload || { page: null, limit: null, filter: [] },
            'post'
        );

        if (response.success) {
            yield put({ type: GET_ALL_USER_SUCCESS, payload: response.data });
        } else {
            yield put(hiddenLoading());
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message)
    }
}
export function* getUsersBasic() {
    yield takeEvery(GET_ALL_USER, HandleGetUsersBasic);
}

export function* handleCRUDUser(action) {
    try {
        const res = yield call(UsersAPIRequest, action.payload?.url, action.payload?.data, action.payload?.method);
        if (res.success) {
            yield put(toggleModal(null));
            yield fork(message.success, res.message);
            yield put(setUserSuccess());
        } else {
            throw new Error(res.message);
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message);
    }
}

export function* CRUDUser() {
    yield takeEvery([ADD_USER, EDIT_USER, DELETE_USER], handleCRUDUser);
}

export default function* rootSaga() {
    yield all([fork(getUsersBasic), fork(CRUDUser)]);
}

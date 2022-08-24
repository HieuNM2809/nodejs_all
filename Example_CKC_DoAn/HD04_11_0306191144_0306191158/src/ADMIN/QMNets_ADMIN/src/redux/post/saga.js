import { message } from 'antd';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_POST, DELETE_POST, EDIT_POST, GET_ALL_POST, GET_ALL_POST_SUCCESS } from '../../constants/ActionTypes';
import callAPi from '../../utils/apiRequest';
import { toggleModal } from '../app/action';
import { hiddenLoading, setPostSuccess } from './action';

export const PostsAPIRequest = async (url = '', data, method = 'get') =>
    await callAPi('admin/posts' + url, method, data,);

function* HandleGetPostsBasic(action) {
    try {
        const response = yield call(
            PostsAPIRequest,
            '/getAll',
            action.payload || { page: null, limit: null, filter: [] },
            'post'
        );

        if (response.success) {
            yield put({ type: GET_ALL_POST_SUCCESS, payload: response.data });
        } else {
            yield put(hiddenLoading());
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message)
    }
}
export function* getPostsBasic() {
    yield takeEvery(GET_ALL_POST, HandleGetPostsBasic);
}

export function* handleCRUDPost(action) {
    try {
        const res = yield call(PostsAPIRequest, action.payload?.url, action.payload?.data, action.payload?.method);
        if (res.success) {
            yield put(toggleModal(null));
            yield fork(message.success, res.message);
            yield put(setPostSuccess());
        } else {
            throw new Error(res.message);
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message);
    }
}

export function* CRUDPost() {
    yield takeEvery([ADD_POST, EDIT_POST, DELETE_POST], handleCRUDPost);
}

export default function* rootSaga() {
    yield all([fork(getPostsBasic), fork(CRUDPost)]);
}

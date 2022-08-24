import { message } from 'antd';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_ALL_COMMENT, GET_ALL_COMMENT_SUCCESS } from '../../constants/ActionTypes';
import callAPi from '../../utils/apiRequest';
import { toggleModal } from '../app/action';
import { hiddenLoading, setCommentSuccess } from './action';

export const CommentsAPIRequest = async (url = '', data, method = 'get') =>
    await callAPi('admin/comments' + url, method, data,);

function* HandleGetCommentsBasic(action) {
    try {
        const response = yield call(
            CommentsAPIRequest,
            '/getAll',
            action.payload || { page: null, limit: null, filter: [] },
            'post'
        );

        if (response.success) {
            yield put({ type: GET_ALL_COMMENT_SUCCESS, payload: response.data });
        } else {
            yield put(hiddenLoading());
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message)
    }
}
export function* getCommentsBasic() {
    yield takeEvery(GET_ALL_COMMENT, HandleGetCommentsBasic);
}

export function* handleCRUDComment(action) {
    try {
        const res = yield call(CommentsAPIRequest, action.payload?.url, action.payload?.data, action.payload?.method);
        if (res.success) {
            yield put(toggleModal(null));
            yield fork(message.success, res.message);
            yield put(setCommentSuccess());
        } else {
            throw new Error(res.message);
        }
    } catch (error) {
        yield put(hiddenLoading());
        message.error(error.message);
    }
}

export function* CRUDComment() {
    yield takeEvery([ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT], handleCRUDComment);
}

export default function* rootSaga() {
    yield all([fork(getCommentsBasic), fork(CRUDComment)]);
}

import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { DELETE, GET } from "../../constants";
import { message } from 'antd'
import callAPi from "../../utils/apiRequest";
import { postFailed } from "../post/action";
import { DELETE_NOTIFY, getNotify, getNotifySuccess, GET_NOTIFY, notifyFailed, READ_NOTIFY, READ_NOTIFY_ALL, UNREAD_NOTIFY } from "./action";

function* handleGetNotifies() {
    yield takeEvery(GET_NOTIFY, function* ({ payload }) {

        try {
            const { page } = yield select(state => state.notify)
            const res = yield callAPi(`notify?page=${(Number(page) + 1) || 1}&limit=20`, GET);
            if (res && res.success) {
                yield put(getNotifySuccess(res.data));

            }
        } catch (error) {
            yield put(notifyFailed());
            message.error(error.message);
        }
    })

}
function* handleReadNotifies() {
    yield takeEvery(READ_NOTIFY, function* ({ payload }) {

        try {
            const res = yield callAPi(`notify/${payload}`, GET);
            if (res && res.success) {
                yield put(getNotify());

            }
        } catch (error) {
            yield put(notifyFailed());
            message.error(error.message);
        }
    })

}
function* handleUnReadNotifies() {
    yield takeEvery(UNREAD_NOTIFY, function* ({ payload }) {

        try {
            const res = yield callAPi(`notify/unread/${payload}`, GET);
            if (res && res.success) {
                yield put(getNotify());
                message.success(res.message);

            }
        } catch (error) {
            yield put(notifyFailed());
            message.error(error.message);
        }
    })

}
function* handleDeleteNotifies() {
    yield takeEvery(DELETE_NOTIFY, function* ({ payload }) {

        try {
            const res = yield callAPi(`notify/${payload}`, DELETE);
            if (res && res.success) {
                yield put(getNotify());
                message.success(res.message);

            }
        } catch (error) {
            yield put(notifyFailed());
            message.error(error.message);
        }
    })

}
function* handleReadAllNotifies() {
    yield takeEvery(READ_NOTIFY_ALL, function* ({ payload }) {

        try {
            const res = yield callAPi(`notify/readAll`, GET);
            if (res && res.success) {
                yield put(getNotify());
            }
        } catch (error) {
            yield put(notifyFailed());
            message.error(error.message);
        }
    })

}

function* rootSaga() {
    yield all([
        fork(handleGetNotifies),
        fork(handleReadNotifies),
        fork(handleReadAllNotifies),
        fork(handleUnReadNotifies),
        fork(handleDeleteNotifies),
    ])
}

export default rootSaga;
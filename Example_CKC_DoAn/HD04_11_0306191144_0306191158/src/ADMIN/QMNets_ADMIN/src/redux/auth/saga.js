import { message } from "antd";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { authEndPoint, GET, POST } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { removeItem, setItem } from "../../utils/localStorage";
import { authFailed, loginSuccess, LOGIN_START, LOGOUT, logoutSuccess, REFRESH_TOKEN } from "./action";


function* handleLogin() {
    yield takeEvery(LOGIN_START, function* (action) {
        try {
            const res = yield call(callAPi, authEndPoint.LOGIN, POST, action.payload);
            if (res && res.success && res.data.user.isAdmin) {
                yield fork(setItem, 'token', res.data.accessToken);
                yield put(loginSuccess(res.data));

            } else {
                yield put(authFailed());
                message.error('Chức năng chỉ dành cho Admin');

            }
        } catch (error) {
            yield put(authFailed());
            message.error(error.message);

        }
    })

}



function* handleRefreshToken() {
    yield takeEvery(REFRESH_TOKEN, function* () {
        try {
            const res = yield call(callAPi, authEndPoint.REFRESH_TOKEN, GET);
            if (res && res.success && res.data.user.isAdmin) {
                yield fork(setItem, 'token', res.data.accessToken);
                yield put(loginSuccess(res.data));

            } else {
                yield put(authFailed());
                message.error('Chức năng chỉ dành cho Admin');

            }
        } catch (error) {
            yield put(authFailed());
            message.error(error.message);
        }
    })
}
function* handleLogout() {
    yield takeEvery(LOGOUT, function* () {
        yield fork(removeItem, 'token');
        yield put(logoutSuccess());
        yield call(callAPi, authEndPoint.LOGOUT, POST);
    })
}



function* rootSaga() {
    yield all([
        fork(handleLogin),
        fork(handleRefreshToken),
        fork(handleLogout),
    ]);
}

export default rootSaga;
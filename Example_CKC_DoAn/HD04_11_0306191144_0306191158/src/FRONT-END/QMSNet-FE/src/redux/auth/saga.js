import { message } from "antd";
import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import { authEndPoint, GET, PATCH, POST } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { removeItem, setItem } from "../../utils/localStorage";
import { setAppLoading, setNotifyModal } from "../app/action";
import { setUserDetailSuccess } from "../user/action";
import { authFailed, CHANGE_PASSWORD, FORGOT_PASSWORD, loginSuccess, LOGIN_START, LOGOUT, logoutSuccess, REFRESH_TOKEN, REGISTER, SEND_MAIL, updateProfileSuccess, UPDATE_PROFILE } from "./action";


function* handleLogin() {
    yield takeEvery(LOGIN_START, function* (action) {
        try {
            const res = yield call(callAPi, authEndPoint.LOGIN, POST, action.payload);
            if (res && res.success) {
                yield fork(setItem, 'token', res.data.accessToken);
                yield put(loginSuccess(res.data));
                yield put(setAppLoading(false))

            }
        } catch (error) {
            yield put(authFailed());
            yield put(setAppLoading(false))

            yield put(setNotifyModal(error))

        }
    })

}
function* handleSendMail() {
    yield takeEvery(SEND_MAIL, function* (action) {
        try {
            const res = yield call(callAPi, authEndPoint.NEW_VERIFY, POST, action.payload);
            if (res && res.success) {
                yield put(setNotifyModal(res))
                yield put(authFailed());

            }
        } catch (error) {
            yield put(authFailed());
            yield put(setNotifyModal(error))
        }
    })

}
function* handleForgotPassword() {
    yield takeEvery(FORGOT_PASSWORD, function* (action) {
        try {
            const res = yield call(callAPi, authEndPoint.FORGOT_PASSWORD, POST, action.payload);
            if (res && res.success) {
                yield put(setNotifyModal(res))
                yield put(authFailed());

            }
        } catch (error) {
            yield put(authFailed());

            yield put(setNotifyModal(error))
        }
    })

}
function* handleRegister() {
    yield takeEvery(REGISTER, function* (action) {
        try {
            const res = yield call(callAPi, authEndPoint.REGISTER, POST, action.payload);
            if (res && res.success) {
                yield put(setNotifyModal(res))
                yield put(authFailed());
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(authFailed());
            yield put(setNotifyModal(error))
        }
    })

}

function* handleRefreshToken() {
    yield takeEvery(REFRESH_TOKEN, function* () {
        try {
            yield put(setAppLoading(true))
            const res = yield call(callAPi, authEndPoint.REFRESH_TOKEN, GET);
            if (res && res?.success) {
                yield fork(setItem, 'token', res.data.accessToken);
                yield put(loginSuccess(res.data));
                yield put(setAppLoading(false))
            }
        } catch (error) {
            yield put(setAppLoading(false))
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

function* handleUpdateProfile() {
    yield takeEvery(UPDATE_PROFILE, function* ({ payload }) {
        const { userDetail } = yield select(state => state.user);
        try {

            const res = yield call(callAPi, authEndPoint.UPDATE_PROFILE, PATCH, payload);
            if (res && res.success) {
                if (userDetail?._id === res.data._id) {
                    yield put(setUserDetailSuccess(res.data))
                }
                yield put(updateProfileSuccess(res.data));
                message.success(res.message);

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(authFailed());
            message.error(error.message);
        }


    })
}
function* handleChangePassword() {
    yield takeEvery(CHANGE_PASSWORD, function* ({ payload }) {
        try {
            const res = yield call(callAPi, '/users/changepassword', PATCH, payload);
            if (res && res.success) {
                yield put(authFailed());
                message.success(res.message);

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(authFailed());
            message.error(error.message);
        }


    })
}


function* rootSaga() {
    yield all([
        fork(handleLogin),
        fork(handleRefreshToken),
        fork(handleUpdateProfile),
        fork(handleLogout),
        fork(handleRegister),
        fork(handleChangePassword),
        fork(handleSendMail),
        fork(handleForgotPassword)
    ]);
}

export default rootSaga;
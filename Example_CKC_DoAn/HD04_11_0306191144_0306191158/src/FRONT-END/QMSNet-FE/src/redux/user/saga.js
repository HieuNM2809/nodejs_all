import { message } from "antd";
import { all, call, fork, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { GET, PATCH, POST, postEndpoint, profileEndpoint } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { updateProfileSuccess } from "../auth/action";
import { handleRealtime } from "../root-saga";
import { getPostUserDetailSuccess, getUserRequestsSuccess, getUserSuggestionsSuccess, GET_POST_USER_DETAIL, GET_USER_REQUESTS, GET_USER_SUGGESTIONS, setUserDetailSuccess, SET_USER_DETAIL, SET_USER_SETTINGS, userFailed, USER_BLOCK, USER_FOLLOW } from "./action";


function* handlegetUserDetail() {
    yield takeEvery(SET_USER_DETAIL, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + `/${payload._id}`, GET);
            if (res && res.success) {
                yield put(setUserDetailSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleGetUserSuggestions() {
    yield takeEvery(GET_USER_SUGGESTIONS, function* ({ payload }) {
        try {
            const { suggestions } = yield select(state => state.user)
            const res = yield call(callAPi, profileEndpoint.USERS + `/suggestions`, POST, {
                userIgnore: suggestions?.userIgnore || []
            });
            if (res && res.success) {
                yield put(getUserSuggestionsSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleGetUserRequest() {
    yield takeEvery(GET_USER_REQUESTS, function* ({ payload }) {
        const { requests } = yield select(state => state.user);
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + `/requests?page=${Number(requests.pagination.page) + 1}&limit=${requests.pagination.limit}`, POST);
            if (res && res.success) {
                yield put(getUserRequestsSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}

function* handleUserFollow() {
    yield takeEvery(USER_FOLLOW, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + `/${payload.path}`, PATCH);
            if (res && res.success) {

                const { userDetail } = yield select(state => state.user)

                yield fork(handleRealtime, "emit", "follow", res?.data?.follower);
                yield put(updateProfileSuccess(res?.data?.following))
                if (!payload?.simple) {
                    yield put(setUserDetailSuccess(res?.data?.follower))
                }
                if (userDetail?._id === res?.data?.following?._id) {
                    yield put(setUserDetailSuccess(res?.data?.following))

                }
                yield put(userFailed());
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleUserBlock() {
    yield takeEvery(USER_BLOCK, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + `/${payload.path}`, payload?.method || PATCH);
            if (res && res.success) {
                yield put(updateProfileSuccess(res?.data))

            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleGetPostUserDetail() {
    yield takeLatest(GET_POST_USER_DETAIL, function* ({ payload, newUser }) {
        try {
            const { postUserDetail } = yield select(state => state.user);

            const res = yield callAPi(postEndpoint.POSTS + `getByUser/${payload}?page=${newUser ? 1 : Number(postUserDetail.pagination.page) + 1}&limit=${postUserDetail.pagination.limit}`, POST);
            if (res && res.success) {
                yield put(getPostUserDetailSuccess({ ...res.data, user_id: payload }));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleSetUserSettings() {
    yield takeEvery(SET_USER_SETTINGS, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + '/userSettings', POST, payload);
            if (res && res.success) {
                yield put(updateProfileSuccess(res.data));
                yield put(userFailed());
                if (payload?.PRIVACY) {
                    message.success(res.message);
                }

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}


function* rootSaga() {
    yield all([
        fork(handlegetUserDetail),
        fork(handleSetUserSettings),
        fork(handleGetPostUserDetail),
        fork(handleUserFollow),
        fork(handleGetUserSuggestions),
        fork(handleGetUserRequest),
        fork(handleUserBlock)
    ]);
}

export default rootSaga;
import { message } from "antd";
import { all, call, fork, put, takeEvery, select, takeLatest } from "redux-saga/effects";
import { DELETE, GET, POST } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { handleRealtime } from "../root-saga";
import { ADD_MESSAGE, changeMessage, conversationFailed, DELETE_CONVERSATION, DELETE_MESSAGE, getConversationSuccess, getMessageSuccess, GET_CONVERSATION, GET_MESSAGE, openConversationSuccess, OPEN_CONVERSATION, READ_MESSAGE, updateConversation } from "./action";


function* handleAddMessage() {
    yield takeEvery(ADD_MESSAGE, function* ({ payload }) {
        try {
            delete payload?._id;
            const res = yield callAPi(`message`, POST, payload);
            if (res && res.success) {
                yield fork(handleRealtime, 'emit', 'message', res.data);
                yield put(updateConversation(res.data, payload?.fakeId))

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}
function* handleReadMessage() {
    yield takeEvery(READ_MESSAGE, function* ({ payload }) {
        try {
            const { conversations } = yield select(state => state.conversation)
            const res = yield callAPi(`/message/updateconversation/${payload}`, GET);
            if (res && res.success) {
                const index = conversations.findIndex((cv) => cv._id === res.data._id)
                if (index !== -1) {
                    const cloneConversation = [...conversations];
                    cloneConversation[index] = { ...cloneConversation[index], ...res.data };
                    yield put(changeMessage(cloneConversation))
                }

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}



function* handleGetConversation() {
    yield takeEvery(GET_CONVERSATION, function* () {
        try {
            const res = yield call(callAPi, `conversations`, GET);
            if (res && res.success) {
                yield put(getConversationSuccess(res.data))
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}
function* handleDeleteConversation() {
    yield takeEvery(DELETE_CONVERSATION, function* ({ payload }) {
        try {
            const { conversations } = yield select(state => state.conversation)

            const index = conversations.findIndex(conversation => conversation._id === payload || conversation._fakeId === payload)

            if (index !== -1) {
                if (conversations[index]?._id) {
                    const res = yield call(callAPi, `conversations/${payload}/delete`, DELETE);
                    if (res && res.success) {

                    } else {
                        throw new Error(res.message)
                    }

                }

                const newConversation = [...conversations];
                newConversation.splice(index, 1);
                yield put(changeMessage(newConversation))
            }

        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}

function* handleDeleteMessage() {
    yield takeEvery(DELETE_MESSAGE, function* ({ payload, isRealTime = false }) {
        try {
            const { conversations } = yield select(state => state.conversation)
            let res;
            if (isRealTime) {
                res = {
                    success: true,
                }
            } else {

                res = yield call(callAPi, `message/${payload?._id}/delete`, DELETE);
            }
            if (res && res.success) {
                const index = conversations.findIndex((cv) => cv._id === payload?.conversation || payload?.message?.conversation)
                if (index !== -1) {
                    if (!isRealTime) {

                        yield fork(handleRealtime, 'emit', 'deleteMessage', { message: payload, conversation: res.data });
                    }
                    const cloneConversation = [...conversations];
                    const newMessage = cloneConversation[index].messages.map((m) => {
                        if (m._id === payload?._id || m._id === payload?.message?._id) {
                            m.deleted = true;
                            return m
                        }
                        return m;
                    })
                    cloneConversation[index] = { ...cloneConversation[index], ...res?.data, ...payload?.conversation };
                    cloneConversation[index].messages = newMessage;
                    yield put(changeMessage(cloneConversation))

                }
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}

function* handleGetMessage() {
    yield takeLatest(GET_MESSAGE, function* ({ payload }) {
        try {

            const res = yield call(callAPi, `message/${payload?._id}?page=${(Number(payload?.pagination?.page) + 1 || 1)}&limit=10`, GET);
            if (res && res.success) {
                const { conversations } = yield select(state => state.conversation)
                const { user } = yield select(state => state.auth)
                const index = conversations.findIndex((cv) => cv._id === res.data?._id);
                if (index !== -1) {
                    yield put(getMessageSuccess({ messages: res.data?.messages, index, pagination: res.data?.pagination, user }))
                }
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}

function* openConversation() {
    yield takeEvery(OPEN_CONVERSATION, function* ({ payload }) {
        const { conversations, totalActive } = yield select(state => state.conversation)
        const toggle = conversations.findIndex((cv) => (cv._id === payload || cv.fakeId === payload));
        const cloneCv = [...conversations];
        let newTotal = totalActive;
        if (toggle !== -1) {
            newTotal = newTotal + 1;
            cloneCv[toggle].isOpen = newTotal;
            yield put(openConversationSuccess({ conversations: cloneCv, totalActive: newTotal }))
        }

    })
}




function* rootSaga() {
    yield all([
        fork(handleAddMessage),
        fork(handleGetMessage),
        fork(handleGetConversation),
        fork(openConversation),
        fork(handleDeleteMessage),
        fork(handleReadMessage),
        fork(handleDeleteConversation)
    ]);
}

export default rootSaga;
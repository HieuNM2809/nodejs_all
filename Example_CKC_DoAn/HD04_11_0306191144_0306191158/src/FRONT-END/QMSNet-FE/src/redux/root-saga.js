import { all, fork, select } from 'redux-saga/effects';
import authSaga from './auth/saga';
import postSaga from './post/saga';
import userSaga from './user/saga';
import conversationSaga from './conversation/saga';
import notifySaga from './notify/saga';

export function* handleRealtime(type, name, payload) {
    const socket = yield select(state => state.socket)
    socket?.data && socket.data[type](name, payload);
}


export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(postSaga),
        fork(userSaga),
        fork(conversationSaga),
        fork(notifySaga)
    ])
}

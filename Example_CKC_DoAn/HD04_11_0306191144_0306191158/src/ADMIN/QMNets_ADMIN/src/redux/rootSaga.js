import { fork, all } from 'redux-saga/effects'
import authSaga from './auth/saga'
import userSaga from './user/saga'
import reportTypeSaga from './reportType/saga'
import reportSaga from './report/saga'
import postSaga from './post/saga'
import commentSaga from './comment/saga'
import postStyleSaga from './postStyle/saga'
import notifySaga from './notify/saga'

function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(userSaga),
        fork(reportTypeSaga),
        fork(reportSaga),
        fork(postSaga),
        fork(commentSaga),
        fork(postStyleSaga),
        fork(notifySaga),
    ])
}


export default rootSaga;
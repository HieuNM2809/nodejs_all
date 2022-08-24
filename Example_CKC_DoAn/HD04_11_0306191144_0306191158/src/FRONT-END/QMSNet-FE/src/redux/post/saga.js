import { message } from "antd";
import { all, call, fork, put, takeEvery, select, takeLatest, delay } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST, postEndpoint } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { setNotifyModal } from "../app/action";
import { updateProfileSuccess } from "../auth/action";
import { handleRealtime } from "../root-saga";
import { ADD_POST, COMMENT, DELETE_POST, EDIT_POST, getPosts, getPostsSuccess, getPostSuccess, GET_POSTS_START, GET_POST_START, HANDLE_UPDATE_POST, HANDLE_UPDATE_POST_USER, postFailed, POST_ACTION, setDetailModal, setPostDetail, setPosts, setPostsUser, toggleModal, toggleNotify, updatePost, updatePostUser } from "./action";
import { PostSelector } from "./reducer";


function* handleGetPosts() {

    yield takeLatest(GET_POSTS_START, function* ({ payload }) {
        try {
            const { user } = yield select(state => state.auth)
            const { page } = yield select(state => state.post)
            const idSelect = user ? user?.following : [];
            const res = yield callAPi(postEndpoint.POSTS + `getAll?page=${(Number(page) + 1) || 1}&limit=5&sort=-createdAt`, POST, payload = { postIds: idSelect });
            if (res && res.success) {
                yield put(getPostsSuccess(res.data));

            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}
function* handleGetPost() {
    yield takeEvery(GET_POST_START, function* ({ payload }) {
        try {
            const res = yield callAPi(`${postEndpoint.POSTS}${payload}`, GET);
            if (res && res.success) {
                yield put(getPostSuccess(res.data));

            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}
function* handleAddPost() {
    yield takeEvery(ADD_POST, function* (action) {
        try {
            const res = yield callAPi(postEndpoint.POSTS, POST, action.payload);
            if (res && res.success) {
                yield put(toggleModal());
                yield put(toggleNotify());
                yield put(setNotifyModal(res))

            }
        } catch (error) {
            yield put(postFailed());
            yield put(setNotifyModal(error))
        }
    })

}
function* handleEditPost() {
    yield takeEvery(EDIT_POST, function* ({ payload }) {
        try {
            const { postDetail } = yield select(state => state.post)
            const res = yield callAPi(postEndpoint.POSTS + payload._id, PATCH, payload);
            if (res && res.success) {
                yield put(toggleModal());
                if (postDetail?._id === res.data._id) {
                    yield put(setPostDetail(res.data))
                }
                yield put(updatePost(res.data));
                yield put(updatePostUser(res.data))
                yield put(setNotifyModal(res))

            }
        } catch (error) {
            yield put(postFailed());
            yield put(setNotifyModal(error))
        }
    })

}
function* handleDeletePost() {
    yield takeEvery(DELETE_POST, function* ({ payload }) {
        try {
            const res = yield callAPi(postEndpoint.POSTS + payload._id, DELETE);
            if (res && res.success) {
                yield put(setDetailModal(null))
                yield put(updatePostUser(res.data, true))
                yield put(updatePost(res.data, true));
                yield put(setNotifyModal(res))
            }
        } catch (error) {
            yield put(postFailed());
            yield put(setNotifyModal(error))
        }
    })

}

export function* handleUpdatePost() {
    yield takeEvery(HANDLE_UPDATE_POST, function* ({ payload, isDelete }) {
        const { data } = yield select(PostSelector);
        if (data.length > 0) {
            const postsClone = [...data];
            const index = postsClone.findIndex(post => post._id === payload._id);
            if (index !== -1) {
                if (isDelete) {
                    postsClone.splice(index, 1);

                } else {

                    postsClone.splice(index, 1, payload);
                }
                yield put(setPosts(postsClone));
            }
        }
    })
}
export function* handleUpdatePostUser() {
    yield takeEvery(HANDLE_UPDATE_POST_USER, function* ({ payload, isDelete }) {
        const { postUserDetail } = yield select((state) => state.user);
        if (postUserDetail?.posts?.length > 0) {
            const postsClone = [...postUserDetail?.posts];
            const index = postsClone.findIndex(post => post._id === payload._id);
            let total = postUserDetail?.total;
            if (index !== -1) {
                if (isDelete) {
                    postsClone.splice(index, 1);
                    total -= 1;

                } else {

                    postsClone.splice(index, 1, payload);
                }
                yield put(setPostsUser({
                    ...postUserDetail,
                    posts: postsClone,
                    total
                }));
            }
        }
    })
}


function* handlePostAction() {
    yield takeEvery(POST_ACTION, function* ({ payload }) {
        try {
            const res = yield callAPi(postEndpoint.POSTS + `${payload.id}/${payload.type}`, PATCH);
            const postDetail = yield select(state => state.post)
            if (res && res.success) {
                if (payload.type.match('save')) {
                    yield put(updateProfileSuccess(res.data))
                } else {
                    if (postDetail?._id === payload.id || payload.isPostDetail) {
                        yield put(setPostDetail(res.data))
                    }
                    if (payload.type === 'like') {

                        yield fork(handleRealtime, 'emit', 'likePost', res.data);
                    }


                    yield put(updatePostUser(res.data))
                    yield put(updatePost(res.data))
                }

            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}
function* handleComment() {
    yield takeEvery(COMMENT, function* ({ payload }) {
        try {
            const res = yield callAPi('/comment/' + `${payload.link || ''}`, payload.method, payload?.data || {});
            if (res && res.success) {
                if (payload.isPostDetail) {
                    yield put(setPostDetail(res.data.post))
                }
                if (payload.link.match('/like')) {
                    yield fork(handleRealtime, 'emit', 'likeCommentPost', res.data.comment);
                }
                if (res.data.comment?.reply) {
                    yield fork(handleRealtime, 'emit', 'replyCommentPost', res.data.comment);
                }
                yield put(updatePostUser(res.data.post))
                yield fork(handleRealtime, 'emit', 'commentPost', res.data.post);
                yield put(updatePost(res.data.post))

            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}



export default function* rootSaga() {
    yield all([
        fork(handleGetPosts),
        fork(handleAddPost),
        fork(handlePostAction),
        fork(handleComment),
        fork(handleGetPost),
        fork(handleUpdatePost),
        fork(handleEditPost),
        fork(handleDeletePost),
        fork(handleUpdatePostUser)
    ])
}


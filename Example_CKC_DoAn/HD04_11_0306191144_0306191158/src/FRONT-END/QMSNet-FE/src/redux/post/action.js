export const GET_POSTS_START = 'GET_POSTS_START';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const POST_FAILED = 'POST_FAILED';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_NOTIFY = 'TOGGLE_NOTIFY';
export const HANDLE_UPDATE_POST = 'HANDLE_UPDATE_POST';
export const HANDLE_UPDATE_POST_USER = 'HANDLE_UPDATE_POST_USER';


export const POST_ACTION = 'POST_ACTION';
export const COMMENT = 'COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SET_DETAIL_MODAL = 'SET_DETAIL_MODAL';

export const SET_POSTS = 'SET_POSTS';
export const SET_POSTS_USER = 'SET_POSTS_USER';
export const SET_POST_DETAIL = 'SET_POST_DETAIL';
export const GET_POST_START = 'GET_POST_START';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';






export const getPosts = (payload) => ({
    type: GET_POSTS_START,
    payload,
});
export const setDetailModal = (payload, params) => ({
    type: SET_DETAIL_MODAL,
    payload,
    params
});
export const updatePost = (payload, isDelete) => ({
    type: HANDLE_UPDATE_POST,
    payload,
    isDelete
});
export const updatePostUser = (payload, isDelete) => ({
    type: HANDLE_UPDATE_POST_USER,
    payload,
    isDelete
});
export const deletePost = (payload, isPostDetail) => ({
    type: DELETE_POST,
    payload,
});
export const getPost = (payload) => ({
    type: GET_POST_START,
    payload,

});
export const getPostSuccess = (payload) => ({
    type: GET_POST_SUCCESS,
    payload,
});
export const setPosts = (payload) => ({
    type: SET_POSTS,
    payload,
});
export const setPostsUser = (payload) => ({
    type: SET_POSTS_USER,
    payload,
});
export const setPostDetail = (payload) => ({
    type: SET_POST_DETAIL,
    payload,
});

export const getPostsSuccess = (payload) => ({
    type: GET_POSTS_SUCCESS,
    payload,
});

export const addPost = (payload) => ({
    type: ADD_POST,
    payload,
})
export const editPost = (payload, isPostDetail) => ({
    type: EDIT_POST,
    payload,
})
export const comment = (payload) => ({
    type: COMMENT,
    payload,
})
export const deleteComment = (payload) => ({
    type: DELETE_COMMENT,
    payload,
})

export const postFailed = () => ({
    type: POST_FAILED,
})
export const toggleModal = (payload, isPostDetail) => ({
    type: TOGGLE_MODAL,
    payload,
    isPostDetail
})
export const toggleNotify = () => ({
    type: TOGGLE_NOTIFY,
})

export const postAction = (payload) => ({
    type: POST_ACTION,
    payload
})


import { GET_POSTS_START, GET_POSTS_SUCCESS, GET_POST_START, GET_POST_SUCCESS, POST_FAILED, SET_DETAIL_MODAL, SET_POSTS, SET_POST_DETAIL, TOGGLE_MODAL, TOGGLE_NOTIFY } from "./action";

const initialState = {
    data: [],
    showModal: false,
    status: {
        success: false,
    },
    detailModal: null,
    postDetailLoading: false,
    loading: false,
    postDetail: null,
    notify: false,
    page: 0,
    limit: 20,
}

const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                data: action.payload
            }
        case SET_DETAIL_MODAL:
            return {
                ...state,
                detailModal: {
                    id: action.payload,
                    params: action?.params
                }
            }
        case GET_POSTS_START:
            return {
                ...state,
                loading: true,
            }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                isOver: action.payload?.pagination?.count === 0,
                ...action.payload?.pagination,
                data: [...state?.data, ...action.payload.posts],
            }
        case GET_POST_START:
            return {
                ...state,
                postDetailLoading: true,
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                postDetailLoading: false,
                postDetail: action.payload,
            }
        case SET_POST_DETAIL:
            return {
                ...state,
                postDetail: action.payload,
            }

        case POST_FAILED:
            return {
                ...state,
                loading: false,
                postDetail: null,
                detailModal: null
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                showModal: action?.payload || !state.showModal,
            }
        case TOGGLE_NOTIFY:
            return {
                ...state,
                notify: !state.notify,
            }

        default:
            return state;
    }
}

export const PostSelector = (state => state.post);


export default PostReducer;
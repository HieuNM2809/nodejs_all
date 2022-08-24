import { SET_POSTS_USER } from "../post/action";
import { GET_POST_USER_DETAIL, GET_POST_USER_DETAIL_SUCCESS, GET_USER_REQUESTS, GET_USER_REQUESTS_SUCCESS, GET_USER_SUGGESTIONS, GET_USER_SUGGESTIONS_SUCCESS, SET_USER_DETAIL, SET_USER_DETAIL_SUCCESS, SET_USER_SETTINGS, USER_FAILED, USER_FOLLOW } from "./action";

const initialState = {
    userDetail: null,
    loading: false,
    postLoading: false,
    suggestionLoading: false,
    suggestions: {
        users: [],
        userIgnore: [],
        total: 8,

    },
    postUserDetail: {
        posts: [],
        user_id: '',
        pagination: {
            count: 10,
            limit: 10,
            page: 0,
        }
    },
    requestLoading: false,
    requests: {
        users: [],
        pagination: {
            page: 0,
            limit: 8,
            count: 8
        },
    },
    status: {
        success: false,
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAIL:
            return {
                ...state,
                loading: true
            }
        case GET_POST_USER_DETAIL:
            return {
                ...state,
                postLoading: true
            }
        case GET_USER_SUGGESTIONS:
            return {
                ...state,
                suggestionLoading: true
            }
        case GET_USER_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: {
                    ...action.payload,
                    userIgnore: [...state?.suggestions?.userIgnore, ...action.payload.userIgnore],
                    users: [...state?.suggestions?.users, ...action.payload.users]
                },
                suggestionLoading: false
            }
        case GET_USER_REQUESTS:
            return {
                ...state,
                requestLoading: true
            }
        case GET_USER_REQUESTS_SUCCESS:
            return {
                ...state,
                requests: {
                    ...action.payload,
                    users: [...state?.requests?.users, ...action.payload.users]
                },
                requestLoading: false
            }
        case SET_POSTS_USER:
            return {
                ...state,
                postUserDetail: action.payload,
            }

        case USER_FAILED:
            return {
                ...state,
                loading: false,
                postLoading: false,
                followLoading: false,
                requestLoading: false,
                suggestionLoading: false,
            }
        case SET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                status: {
                    success: true
                },
                userDetail: action.payload,
                loading: false,
                followLoading: false,
            }
        case GET_POST_USER_DETAIL_SUCCESS:
            const posts = state.postUserDetail.user_id === action.payload.user_id ? [...state.postUserDetail.posts, ...action.payload.posts] : action.payload.posts
            return {
                ...state,
                postUserDetail: {
                    ...action.payload,
                    posts
                },
                postLoading: false,
            }
        case SET_USER_SETTINGS:
            return {
                ...state,
                loading: true,
            }

        case USER_FOLLOW:
            return {
                ...state,
                followLoading: true,

            }

        default:
            return state;
    }
}

export const userSelector = (state) => state.user;

export default userReducer;




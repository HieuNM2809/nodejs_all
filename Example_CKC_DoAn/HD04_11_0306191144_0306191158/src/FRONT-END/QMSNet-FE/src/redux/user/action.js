
export const SET_USER_DETAIL = 'SET_USER_DETAIL';
export const SET_USER_DETAIL_SUCCESS = 'SET_USER_DETAIL_SUCCESS';
export const GET_POST_USER_DETAIL = 'GET_POST_USER_DETAIL';
export const GET_POST_USER_DETAIL_SUCCESS = 'GET_POST_USER_DETAIL_SUCCESS';
export const SET_USER_SETTINGS = 'SET_USER_SETTINGS';
export const GET_USER_SUGGESTIONS = 'GET_USER_SUGGESTIONS';
export const GET_USER_SUGGESTIONS_SUCCESS = 'GET_USER_SUGGESTIONS_SUCCESS';
export const GET_USER_REQUESTS = 'GET_USER_REQUESTS';
export const GET_USER_REQUESTS_SUCCESS = 'GET_USER_REQUESTS_SUCCESS';
export const USER_FAILED = 'USER_FAILED';
export const USER_FOLLOW = 'USER_FOLLOW';
export const USER_BLOCK = 'USER_BLOCK';

export const setUserDetail = (payload) => ({
    type: SET_USER_DETAIL,
    payload,
})
export const getPostUserDetail = (payload, newUser) => ({
    type: GET_POST_USER_DETAIL,
    payload,
    newUser
})
export const getPostUserDetailSuccess = (payload) => ({
    type: GET_POST_USER_DETAIL_SUCCESS,
    payload,
})
export const setUserDetailSuccess = (payload) => ({
    type: SET_USER_DETAIL_SUCCESS,
    payload,
})
export const userFollow = (payload) => ({
    type: USER_FOLLOW,
    payload,
})
export const userBlock = (payload) => ({
    type: USER_BLOCK,
    payload,
})
export const getUserSuggestions = (payload) => ({
    type: GET_USER_SUGGESTIONS,
    payload,
})
export const getUserSuggestionsSuccess = (payload) => ({
    type: GET_USER_SUGGESTIONS_SUCCESS,
    payload,
})
export const getUserRequests = (payload) => ({
    type: GET_USER_REQUESTS,
    payload,
})
export const getUserRequestsSuccess = (payload) => ({
    type: GET_USER_REQUESTS_SUCCESS,
    payload,
})


export const userFailed = (payload) => ({
    type: USER_FAILED,
    payload,
})
export const setUserSettings = (payload) => ({
    type: SET_USER_SETTINGS,
    payload,
})


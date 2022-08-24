import appActions, { AUTH_FAILED, FORGOT_PASSWORD, LOGIN_START, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER, SEND_MAIL, UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS } from "./action";

const initialState = {
    user: null,
    loading: false,
    isLogin: false,
    isLogout: false,
    status: {
        success: false,
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case REGISTER:
            return {
                ...state,
                loading: true
            }
        case SEND_MAIL:
            return {
                ...state,
                loading: true
            }
        case FORGOT_PASSWORD:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: 'token',
                loading: false,
                isLogin: true,
                isLogout: false,

            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
                isLogin: false,
                isLogout: true,
            }
        case AUTH_FAILED:
            return {
                ...state,
                loading: false
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                loading: true
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                status: {
                    success: true,
                },
                loading: false
            }


        default:
            return state;
    }
}

export const authSelector = (state) => state.auth;

export default authReducer;




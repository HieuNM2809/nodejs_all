const DOCUMENT = 'AUTH_';


export const LOGIN_START = DOCUMENT + 'LOGIN_START';
export const LOGIN_SUCCESS = DOCUMENT + 'LOGIN_SUCCESS';
export const AUTH_FAILED = DOCUMENT + 'FAILED';

export const REFRESH_TOKEN = DOCUMENT + 'REFRESH_TOKEN';
export const LOGOUT = DOCUMENT + 'LOGOUT';
export const LOGOUT_SUCCESS = DOCUMENT + 'LOGOUT_SUCCESS';



export const loginStart = (payload) => ({
    type: LOGIN_START,
    payload,
})

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload,
})

export const authFailed = (payload) => ({
    type: AUTH_FAILED,
    payload,
})
export const refreshToken = () => ({
    type: REFRESH_TOKEN,
})

export const logout = (payload) => ({
    type: LOGOUT,
})
export const logoutSuccess = (payload) => ({
    type: LOGOUT_SUCCESS,
})

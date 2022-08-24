import { APP_ACTION } from './action';

const initialState = {
    WIDTH: window.innerWidth,
    appLoading: null,
    tabActive: 'home',
    notify: null,
    reportModal: null,
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case APP_ACTION.updateWindowSize:
            return {
                ...state,
                WIDTH: action.payload,
            };
        case APP_ACTION.setAppLoading:
            return {
                ...state,
                appLoading: action.payload,
            };
        case APP_ACTION.setTabActive:
            return {
                ...state,
                tabActive: action.payload,
            };
        case APP_ACTION.setNotifyModal:
            return {
                ...state,
                notify: action.payload,
            };
        case APP_ACTION.setReportModal:
            return {
                ...state,
                reportModal: action.payload,
            };
        default:
            return state;
    }
};

export default app;

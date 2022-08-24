import {
    ADD_NOTIFY,
    DELETE_NOTIFY,
    EDIT_NOTIFY,
    GET_ALL_NOTIFY,
    GET_ALL_NOTIFY_SUCCESS, HIDE_LOADING_NOTIFY
} from '../../constants/ActionTypes';
import { SUCCESS } from './action';

const INIT_STATE = {
    loading: false,
    data: {},
};

const notifyReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_NOTIFY:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_NOTIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ADD_NOTIFY:
            return {
                ...state,
                success: false,
            };

        case EDIT_NOTIFY:
            return {
                ...state,
                success: false,
            };
        case DELETE_NOTIFY:
            return {
                ...state,
                success: false,
            };
        case SUCCESS: {
            return {
                ...state,
                success: true,

            }
        }

        case HIDE_LOADING_NOTIFY:
            return {
                ...state,
                success: false,
                loading: false,
            };

        default:
            return state;
    }
};

export default notifyReducer;

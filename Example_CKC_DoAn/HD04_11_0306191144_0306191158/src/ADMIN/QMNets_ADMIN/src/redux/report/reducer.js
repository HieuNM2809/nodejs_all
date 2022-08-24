import {
    ADD_REPORT,
    DELETE_REPORT,
    EDIT_REPORT,
    GET_ALL_REPORT,
    GET_ALL_REPORT_SUCCESS, HIDE_LOADING_REPORT
} from '../../constants/ActionTypes';
import { SUCCESS } from './action';

const INIT_STATE = {
    loading: false,
    data: {},
};

const reportReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_REPORT:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ADD_REPORT:
            return {
                ...state,
                success: false,
                loading: true,
            };

        case EDIT_REPORT:
            return {
                ...state,
                success: false,
                loading: true,
            };
        case DELETE_REPORT:
            return {
                ...state,
                success: false,
                loading: true,
            };
        case SUCCESS: {
            return {
                ...state,
                success: true,

            }
        }

        case HIDE_LOADING_REPORT:
            return {
                ...state,
                success: false,
                loading: false,
            };

        default:
            return state;
    }
};

export default reportReducer;

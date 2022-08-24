import {
    ADD_REPORTTYPE,
    DELETE_REPORTTYPE,
    EDIT_REPORTTYPE,
    GET_ALL_REPORTTYPE,
    GET_ALL_REPORTTYPE_SUCCESS, HIDE_LOADING_REPORTTYPE
} from '../../constants/ActionTypes';
import { SUCCESS } from './action';

const INIT_STATE = {
    loading: false,
    data: {},
};

const reportTypeReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_REPORTTYPE:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_REPORTTYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ADD_REPORTTYPE:
            return {
                ...state,
                success: false,
            };

        case EDIT_REPORTTYPE:
            return {
                ...state,
                success: false,
            };
        case DELETE_REPORTTYPE:
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

        case HIDE_LOADING_REPORTTYPE:
            return {
                ...state,
                success: false,
                loading: false,
            };

        default:
            return state;
    }
};

export default reportTypeReducer;

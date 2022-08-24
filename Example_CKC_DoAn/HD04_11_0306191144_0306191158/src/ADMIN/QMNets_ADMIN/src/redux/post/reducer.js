import {
    ADD_POST,
    DELETE_POST,
    EDIT_POST,
    GET_ALL_POST,
    GET_ALL_POST_SUCCESS, HIDE_LOADING_POST
} from '../../constants/ActionTypes';
import { SUCCESS } from './action';

const INIT_STATE = {
    loading: false,
    data: {},
};

const postReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_POST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ADD_POST:
            return {
                ...state,
                success: false,
            };

        case EDIT_POST:
            return {
                ...state,
                success: false,
            };
        case DELETE_POST:
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

        case HIDE_LOADING_POST:
            return {
                ...state,
                success: false,
                loading: false,
            };

        default:
            return state;
    }
};

export default postReducer;

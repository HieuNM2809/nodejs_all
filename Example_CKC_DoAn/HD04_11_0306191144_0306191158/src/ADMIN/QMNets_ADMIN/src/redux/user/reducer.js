import {
    ADD_USER,
    DELETE_USER,
    EDIT_USER,
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    HIDE_LOADING,
} from '../../constants/ActionTypes';
import { SUCCESS } from './action';

const INIT_STATE = {
    loading: false,
    data: {},
};

const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_USER:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ADD_USER:
            return {
                ...state,
                success: false,
                loading: true,
            };

        case EDIT_USER:
            return {
                ...state,
                success: false,
                loading: true,
            };
        case DELETE_USER:
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

        case HIDE_LOADING:
            return {
                ...state,
                success: false,
                loading: false,
            };

        default:
            return state;
    }
};

export default userReducer;

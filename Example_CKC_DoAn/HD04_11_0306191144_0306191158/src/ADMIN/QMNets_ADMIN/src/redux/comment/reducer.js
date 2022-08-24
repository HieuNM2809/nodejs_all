import {
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    GET_ALL_COMMENT,
    GET_ALL_COMMENT_SUCCESS, HIDE_LOADING_COMMENT
} from '../../constants/ActionTypes';
import { SUCCESS } from './action';

const INIT_STATE = {
    loading: false,
    data: {},
};

const commentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_COMMENT:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ADD_COMMENT:
            return {
                ...state,
                success: false,
            };

        case EDIT_COMMENT:
            return {
                ...state,
                success: false,
            };
        case DELETE_COMMENT:
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

        case HIDE_LOADING_COMMENT:
            return {
                ...state,
                success: false,
                loading: false,
            };

        default:
            return state;
    }
};

export default commentReducer;

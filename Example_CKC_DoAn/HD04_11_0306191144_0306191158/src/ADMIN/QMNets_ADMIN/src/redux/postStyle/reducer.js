import {
    ADD_POSTSTYLE,
    DELETE_POSTSTYLE,
    EDIT_POSTSTYLE,
    GET_ALL_POSTSTYLE,
    GET_ALL_POSTSTYLE_SUCCESS, HIDE_LOADING_POSTSTYLE
} from '../../constants/ActionTypes';
import { SUCCESS } from './action';

const INIT_STATE = {
    loading: false,
    data: {},
};

const postStyleReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_POSTSTYLE:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_POSTSTYLE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ADD_POSTSTYLE:
            return {
                ...state,
                success: false,
            };

        case EDIT_POSTSTYLE:
            return {
                ...state,
                success: false,
            };
        case DELETE_POSTSTYLE:
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

        case HIDE_LOADING_POSTSTYLE:
            return {
                ...state,
                success: false,
                loading: false,
            };

        default:
            return state;
    }
};

export default postStyleReducer;

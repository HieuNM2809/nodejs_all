import { GET_NOTIFY, GET_NOTIFY_SUCCESS, GET_SOCKET, NOTIFY_FAILED } from "./action";

const initialState = {
    data: null,
    page: 0,
    loading: false,
}

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFY:
            return {
                loading: true,
                data: action.payload
            };
        case GET_NOTIFY_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case NOTIFY_FAILED:
            return {
                loading: false,
            }
        default:
            return state;
    }
}

export default notifyReducer;
import { SET_ONLINE } from "./action";

const initialState = {
    data: null
}

const onlineReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ONLINE:
            return {
                data: action.payload
            };
        default:
            return state;
    }
}

export default onlineReducer;
import { GET_SOCKET } from "./action";

const initialState ={
    data: null
}

const socketReducer = (state=initialState,action) =>{
    switch (action.type) {
        case GET_SOCKET:
            return {
                data : action.payload
            };
        default:
            return state;
    }
}

export default socketReducer;
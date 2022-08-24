import { ADD_CONVERSATION, CHANGE_MESSAGE, CONVERSATION_FAILED, GET_CONVERSATION, GET_CONVERSATION_SUCCESS, GET_MESSAGE_SUCCESS, OPEN_CONVERSATION_SUCCESS, TOGGLE_CONVERSATION, TOGGLE_NEW_CONVERSATION, UPDATE_CONVERSATION } from "./action";

const initialState = {
    loading: false,
    conversations: [],
    totalActive: 0,
    newConversationShow: false

}


const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONVERSATION:
            const current = [...state.conversations];
            current.unshift(action.payload);
            return {
                ...state,
                totalActive: action.payload.isOpen,
                conversations: current
            }
        case TOGGLE_NEW_CONVERSATION:
            return {
                ...state,
                newConversationShow: !state.newConversationShow
            }
        case GET_CONVERSATION:
            return {
                ...state,
                loading: true,
            }
        case CHANGE_MESSAGE:
            return {
                ...state,
                conversations: action.payload
            }

        case TOGGLE_CONVERSATION:
            const toggle = state.conversations.findIndex((cv) => (cv._id === action.payload || cv.fakeId === action.payload));
            const cloneCv = [...state.conversations];
            let newTotal = state.totalActive;
            if (toggle !== -1) {
                cloneCv[toggle].isOpen = "";

            }
            return {
                ...state,
                conversations: cloneCv,
                totalActive: newTotal
            }
        case OPEN_CONVERSATION_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case GET_CONVERSATION_SUCCESS:
            return {
                ...state,
                conversations: action.payload,
                loading: false,
            }
        case GET_MESSAGE_SUCCESS:
            const currentMessages = state.conversations[action.payload.index]?.pagination?.page === action.payload.pagination.page ? [] : state.conversations[action.payload.index]?.messages || [];
            state.conversations[action.payload.index].messages = [...currentMessages, ...action.payload.messages]
            state.conversations[action.payload.index].pagination = action.payload.pagination;
            state.conversations[action.payload.index].isOver = action.payload.pagination.count < 10;
            return {
                ...state,
                loading: false,
            }
        case CONVERSATION_FAILED:
            return {
                ...state,
                loading: false,
            }
        case UPDATE_CONVERSATION:
            const clone = [...state.conversations];
            let index = -1;
            let totalActive = state.totalActive;
            if (action?.fakeId) {
                index = clone.findIndex((cv) => cv.fakeId === action?.fakeId)

            } else {

                index = clone.findIndex((cv) => cv._id === action.payload.conversation._id)

            }
            let cloneMessage = clone[index]?.messages ? clone[index].messages : [];
            delete clone[index]?.read;
            let newConversation = { ...clone[index], ...action?.payload?.conversation, messages: [action?.payload?.message, ...cloneMessage] };
            if (!newConversation?.isOpen) {
                newConversation.isOpen = state.totalActive + 1;
                totalActive = state.totalActive + 1;
                if (!clone[index]?.pagination) {

                    newConversation.messages.pop();
                }

            } else {
                if (action?.fakeId) {
                    newConversation.messages.pop();
                    totalActive = state.totalActive + 1;

                }
            }
            delete newConversation?.fakeId;
            if (index !== -1) {

                clone.splice(index, 1);
                clone.unshift(newConversation);
            } else {
                newConversation.messages.pop();
                clone.unshift(newConversation);
            }
            return {
                ...state,
                conversations: clone,
                totalActive
            }

        default:
            return state;
    }
}

export const conversationSelector = (state) => state.conversation;

export default conversationReducer;




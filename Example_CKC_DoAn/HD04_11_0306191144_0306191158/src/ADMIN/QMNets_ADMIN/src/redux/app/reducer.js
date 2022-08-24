import { appActions } from "./action"

const appReducer = (state = {
    toggleModal: null
}, action) => {
    switch (action.type) {
        case 'SET_MODE':
            return {
                ...state,
                mode: action.payload
            }
        case 'SET_COLOR':
            return {
                ...state,
                color: action.payload
            }
        case appActions.TOGGLEMODAL:
            console.log('aa')
            return {
                ...state,
                dataModal: action.payload
            }
        default:
            return state
    }
}

export default appReducer
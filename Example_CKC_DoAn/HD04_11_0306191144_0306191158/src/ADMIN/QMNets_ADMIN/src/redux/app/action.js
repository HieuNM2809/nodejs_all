export const appActions = {
    TOGGLEMODAL: 'TOGGLEMODAL'
}


const setMode = mode => {
    return {
        type: 'SET_MODE',
        payload: mode
    }
}
export const toggleModal = payload => {
    return {
        type: appActions.TOGGLEMODAL,
        payload
    }
}

const setColor = color => {
    return {
        type: 'SET_COLOR',
        payload: color
    }
}

const getTheme = () => {
    return {
        type: 'GET_THEME'
    }
}

const exportDefault = {
    setColor,
    setMode,
    getTheme
}

export default exportDefault
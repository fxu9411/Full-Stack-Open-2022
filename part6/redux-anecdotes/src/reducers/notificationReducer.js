const notificationReducer = (state = null, action) => {
    console.log('ACTION: ', action)
    switch (action.type) {
        case 'NOTIFY':
            return action.data.message
        case 'MUTE':
            return null
        default:
            return state
    }
}

export const setNotification = (message) => {
    return {
        type: 'NOTIFY',
        data: { message }
    }
}

export const clearNotification = () => ({
    type: 'MUTE'
})

export const notify = (message, timer = 10) => {
    return async dispatch => {
        await dispatch(setNotification(message))
        setTimeout(
            async () => await dispatch(clearNotification()), timer * 1000
        )
    }
}

export default notificationReducer
export function addSystemMessage(message) {
    return dispatch => {
        dispatch({
            type: "ADD_SYSTEM_MESSAGE",
            message
        })
    }
}

export function deleteSystemMessage() {
    return dispatch => {

        dispatch({
            type: "DELETE_SYSTEM_MESSAGE"
        })
    }
}

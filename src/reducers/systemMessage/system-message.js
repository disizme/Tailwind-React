export default function systemMessage
    (state = { message:null }, action) {

    switch (action.type)
    {
        case 'ADD_SYSTEM_MESSAGE':
            return {...state, ...{message: action.message }};

        case 'DELETE_SYSTEM_MESSAGE':
            return {...state, ...{ message: null }};

        default: return state;
    }
}
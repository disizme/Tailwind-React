export default function updatePassword
    (state = {error: null, success: null, processing: ''}, action) {

    switch (action.type) {
        case 'UPDATE_PASSWORD_SUCCESS':
            return {...state, ...{success: action.success, error: null}};
        case 'UPDATE_PASSWORD_ERROR':
            return {...state, ...{success: null, error: action.error}};
        case 'UPDATE_PASSWORD_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};
        default:
            return state;
    }
}

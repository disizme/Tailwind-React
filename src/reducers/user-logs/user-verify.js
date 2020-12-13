export default function userVerify
    (state = {error: null, success: null, processing: ''}, action) {

    switch (action.type) {
        case 'USER_VERIFY_SUCCESS':
            return {...state, ...{success: action.success, error: null}};
        case 'USER_VERIFY_ERROR':
            return {...state, ...{success: null, error: action.error}};
        case 'USER_VERIFY_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};
        default:
            return state;
    }
}

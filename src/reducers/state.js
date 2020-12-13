import { combineReducers } from 'redux';

import loading from './activateLoading/activate-loading';
import systemMessage from './systemMessage/system-message';

import getSignUpRequest from "./user-logs/user-register";
import getLoginRequest from "./user-logs/user-login";
import updatePassword from "./user-logs/update-password";
import resetPassword from "./user-logs/reset-password";
import forgotPassword from './user-logs/forgot-password';
import userVerify from './user-logs/user-verify';

const allReducers = combineReducers({
    loading, systemMessage, userVerify,
    getSignUpRequest, getLoginRequest, updatePassword, resetPassword, forgotPassword
});

export default allReducers;

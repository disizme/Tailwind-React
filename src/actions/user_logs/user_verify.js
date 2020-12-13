import axios from 'axios';
import {Config} from "../../config.template";
import { errorHandler } from '../../helpers/ErrorHandler';
import userVerify from '../../reducers/user-logs/user-verify';
import store from "../../Store";
import { addSystemMessage } from '../systemMessage/system_message';

function _success(success) {
  return {type: 'USER_VERIFY_SUCCESS', success}
}

function _error(error) {
  return {type: 'USER_VERIFY_ERROR', error}
}

function _processing(processing) {
  return {type: 'USER_VERIFY_PROCESSING', processing}
}

export function verifyUser(token){
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.base_url + `/auth/verify/${token}`,
      method: "get",
    };
    axios(config).then(res => {
      dispatch(_processing(false));
      dispatch(_success(res));
        console.log(res)
        store.dispatch(addSystemMessage({
          message: { variant: `success`, message: res.data.message, title: ``}
        }))
      }).catch(error => {
        let response = errorHandler(error)
          store.dispatch(addSystemMessage({
            message: { variant: `error`, message: response.data, title: ``}
          }))
          dispatch(_error({ response:{ status: 500, data: response.data}}));
          dispatch(_processing(false));
      });
  }
}

export default userVerify;


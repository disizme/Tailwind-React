import axios from 'axios';
import {Config} from "../../config.template";
import { errorHandler } from '../../helpers/ErrorHandler';
import store from "../../Store";
import { addSystemMessage } from '../systemMessage/system_message';

function _success(success) {
  return {type: 'FETCH_SIGNUP_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_SIGNUP_ERROR', error}
}

function _processing(processing) {
    if (processing)
      return { type: 'ACTIVATE_LOADING' }
    else
      return { type: 'DEACTIVATE_LOADING' }
}

export function userSignup(data) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.base_url + `/auth/signup`,
      method: "post",
      dataType: 'json',
      data: data,
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

export default userSignup;


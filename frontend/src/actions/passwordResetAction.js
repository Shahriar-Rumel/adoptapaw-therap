import {
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_FAIL,
  PASSWORD_RESET_REQUEST_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_SUCCESS
} from '../constants/passwordResetConstant';
import axios from 'axios';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL + '/api/auth';

export const resetPasswordRequest = (email) => async (dispatch) => {
  try {
    dispatch({
      type: PASSWORD_RESET_REQUEST_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `${BASE_URL}/resetrequest?email=${email}`,
      config
    );

    dispatch({
      type: PASSWORD_RESET_REQUEST_SUCCESS,
      payload: data
    });

    localStorage.setItem('passwordResetStore', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_REQUEST_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: PASSWORD_RESET_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log(token);
    console.log(password);

    const { data } = await axios.put(
      `${BASE_URL}/reset/${token}`,
      { password },
      config
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: data
    });

    localStorage.setItem('passwordStore', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

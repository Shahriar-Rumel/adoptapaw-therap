import {
  PASSWORD_RESET_REQUEST_FAIL,
  PASSWORD_RESET_REQUEST_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS
} from '../constants/passwordResetConstant';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/auth';

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

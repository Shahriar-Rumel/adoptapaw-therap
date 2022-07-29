import {
  FEEDBACK_CREATE_FAIL,
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS
} from '../constants/feedbackConstants';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/feedback';

export const feedbackCreateAction =
  (dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FEEDBACK_CREATE_REQUEST
      });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios.post(`${BASE_URL}/create`, dataport, config);

      dispatch({
        type: FEEDBACK_CREATE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: FEEDBACK_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

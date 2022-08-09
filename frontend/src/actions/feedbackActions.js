import {
  FEEDBACK_CREATE_FAIL,
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_FAIL,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS
} from '../constants/feedbackConstants';
import axios from 'axios';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL + '/api/feedback';

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

export const feedbackAction =
  (pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FEEDBACK_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.jwtdto.accessToken}`
        }
      };

      const { data } = await axios.get(
        `${BASE_URL}/all?pageNo=${pageNo}&pageSize=${pageSize}`,
        config
      );

      dispatch({
        type: FEEDBACK_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FEEDBACK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

import axios from 'axios';
import {
  ADOPTION_REQUESTS_BY_USERID_FAIL,
  ADOPTION_REQUESTS_BY_USERID_REQUEST,
  ADOPTION_REQUESTS_BY_USERID_SUCCESS,
  ADOPTION_REQUEST_BY_ID_FAIL,
  ADOPTION_REQUEST_BY_ID_REQUEST,
  ADOPTION_REQUEST_BY_ID_SUCCESS
} from '../constants/adoptionRequestConstants';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL + '/api';

export const adoptionRequestsByUserIdAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADOPTION_REQUESTS_BY_USERID_REQUEST
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
        `${BASE_URL}/user/${id}/adoption/request`,
        config
      );

      dispatch({
        type: ADOPTION_REQUESTS_BY_USERID_SUCCESS,
        payload: data
      });

      // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADOPTION_REQUESTS_BY_USERID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const adoptionRequestByIdAction =
  (uid, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADOPTION_REQUEST_BY_ID_REQUEST
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
        `${BASE_URL}/user/${uid}/adoption/request/${id}`,
        config
      );

      dispatch({
        type: ADOPTION_REQUEST_BY_ID_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ADOPTION_REQUEST_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

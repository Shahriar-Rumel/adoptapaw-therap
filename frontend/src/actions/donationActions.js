import axios from 'axios';
import {
  DONATION_BY_USERID_FAIL,
  DONATION_BY_USERID_REQUEST,
  DONATION_BY_USERID_SUCCESS,
  DONATION_CREATE_FAIL,
  DONATION_CREATE_REQUEST,
  DONATION_CREATE_SUCCESS
} from '../constants/donationConstants';
import {
  DONATION_POST_BY_ID_RESET,
  DONATION_POST_BY_ID_SUCCESS
} from '../constants/donationPostConstants';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL + '/api';

export const donationCreateAction =
  (amountofmoney, id, uid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DONATION_CREATE_REQUEST
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

      await axios.post(
        `${BASE_URL}/donationpost/${id}/user/${uid}/createdonation`,
        { amountofmoney },
        config
      );

      dispatch({
        type: DONATION_CREATE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: DONATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const donationByUserIdAction =
  (id, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DONATION_BY_USERID_REQUEST
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
        `${BASE_URL}/user/${id}/donation?pageNo=${pageNo}&pageSize=${pageSize}`,
        config
      );

      dispatch({
        type: DONATION_BY_USERID_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: DONATION_BY_USERID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

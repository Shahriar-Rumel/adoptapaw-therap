import axios from 'axios';
import {
  DONATION_CREATE_FAIL,
  DONATION_CREATE_REQUEST,
  DONATION_CREATE_SUCCESS
} from '../constants/donationConstants';

const BASE_URL = 'http://localhost:8081/api';

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
        `${BASE_URL}/donation/${id}/user/${uid}/createdonation`,
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

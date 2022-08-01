import axios from 'axios';
import {
  ADMIN_STATS_FAIL,
  ADMIN_STATS_REQUEST,
  ADMIN_STATS_SUCCESS
} from '../constants/adminConstants';

const BASE_URL = 'http://localhost:8081/api/admin';

export const adminStatsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_STATS_REQUEST
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

    const { data } = await axios.get(`${BASE_URL}/stats`, config);

    dispatch({
      type: ADMIN_STATS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

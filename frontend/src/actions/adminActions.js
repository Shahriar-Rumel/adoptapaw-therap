import axios from 'axios';
import {
  ADMIN_STATS_FAIL,
  ADMIN_STATS_REQUEST,
  ADMIN_STATS_SUCCESS,
  ADMIN_USER_BAN_FAIL,
  ADMIN_USER_BAN_REQUEST,
  ADMIN_USER_BAN_SUCCESS
} from '../constants/adminConstants';
import { GET_ALL_USER_SUCCESS } from '../constants/userConstants';

const BASE_URL = 'http://localhost:8081/api';

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

    const { data } = await axios.get(`${BASE_URL}/admin/stats`, config);

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
export const adminUserBanAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_USER_BAN_REQUEST
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

    const { data } = await axios.put(
      `${BASE_URL}/auth/admin/user/${id}/ban`,
      config
    );

    dispatch({
      type: ADMIN_USER_BAN_SUCCESS
    });
    // dispatch({
    //   type: GET_ALL_USER_SUCCESS,
    //   payload: data
    // });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_BAN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

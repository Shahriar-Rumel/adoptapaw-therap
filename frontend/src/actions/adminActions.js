import {
  ADMIN_ALL_ADOPTION_REQUEST_FAIL,
  ADMIN_ALL_ADOPTION_REQUEST_REQUEST,
  ADMIN_ALL_ADOPTION_REQUEST_SUCCESS,
  ADMIN_STATS_FAIL,
  ADMIN_STATS_REQUEST,
  ADMIN_STATS_SUCCESS,
  ADMIN_USER_BAN_FAIL,
  ADMIN_USER_BAN_REQUEST,
  ADMIN_USER_BAN_SUCCESS
} from '../constants/adminConstants';
import {
  ADOPTION_REQUEST_APPROVE_FAIL,
  ADOPTION_REQUEST_APPROVE_REQUEST,
  ADOPTION_REQUEST_APPROVE_SUCCESS
} from '../constants/adoptionRequestConstants';

import axios from 'axios';

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
      { withCredentials: true },
      config
    );

    dispatch({
      type: ADMIN_USER_BAN_SUCCESS
    });
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
export const adminAdoptionRequestsAction =
  (id, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_ALL_ADOPTION_REQUEST_REQUEST
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

      console.log(config);
      const { data } = await axios.get(
        `${BASE_URL}/admin/${id}/adoption/request/all?pageNo=${pageNo}&pageSize=${pageSize}`,
        config
      );

      dispatch({
        type: ADMIN_ALL_ADOPTION_REQUEST_SUCCESS,
        payload: data
      });

      // localStorage.setItem('adoptionPosts', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADMIN_ALL_ADOPTION_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const adminAdoptionRequestApproveAction =
  (uid, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADOPTION_REQUEST_APPROVE_REQUEST
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

      console.log(config);
      const { data } = await axios.post(
        `${BASE_URL}/admin/${uid}/adoption/request/${id}/approve`,
        { withCredentials: true },
        config
      );
      dispatch({
        type: ADOPTION_REQUEST_APPROVE_SUCCESS,
        payload: data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADOPTION_REQUEST_APPROVE_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message
      });
    }
  };

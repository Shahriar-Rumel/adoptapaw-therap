import axios from 'axios';
import {
  DONATION_POSTS_FAIL,
  DONATION_POSTS_REQUEST,
  DONATION_POSTS_SUCCESS,
  DONATION_POST_BY_ID_FAIL,
  DONATION_POST_BY_ID_REQUEST,
  DONATION_POST_BY_ID_SUCCESS,
  DONATION_POST_CREATE_FAIL,
  DONATION_POST_CREATE_REQUEST,
  DONATION_POST_CREATE_SUCCESS,
  DONATION_POST_DELETE_FAIL,
  DONATION_POST_DELETE_REQUEST,
  DONATION_POST_DELETE_SUCCESS,
  DONATION_POST_UPDATE_FAIL,
  DONATION_POST_UPDATE_REQUEST,
  DONATION_POST_UPDATE_SUCCESS
} from '../constants/donationPostConstants';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL + '/api/donationpost';

export const donationPostCreateAction =
  (dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DONATION_POST_CREATE_REQUEST
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

      await axios.post(`${BASE_URL}/createdonationspost`, dataport, config);

      dispatch({
        type: DONATION_POST_CREATE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: DONATION_POST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const donationPostsAction =
  (pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DONATION_POSTS_REQUEST
      });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.get(
        `${BASE_URL}/all?pageNo=${pageNo}&pageSize=${pageSize}`
      );

      dispatch({
        type: DONATION_POSTS_SUCCESS,
        payload: data
      });

      // localStorage.setItem('adoptionPosts', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: DONATION_POSTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const donationPostByIdAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONATION_POST_BY_ID_REQUEST
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
    const { data } = await axios.get(`${BASE_URL}/${id}`, config);

    dispatch({
      type: DONATION_POST_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DONATION_POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const donationPostUpdateAction =
  (id, dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DONATION_POST_UPDATE_REQUEST
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

      const { data } = await axios.post(`${BASE_URL}/${id}`, dataport, config);

      dispatch({
        type: DONATION_POST_UPDATE_SUCCESS
      });
      dispatch({
        type: DONATION_POST_BY_ID_SUCCESS,
        payload: data
      });

      // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: DONATION_POST_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const donationPostDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONATION_POST_DELETE_REQUEST
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

    const { data } = await axios.delete(`${BASE_URL}/${id}`, config);

    dispatch({
      type: DONATION_POST_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: DONATION_POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

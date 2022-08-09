import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_LOGOUT,
  USER_PROFILE_EDIT_FAIL,
  USER_PROFILE_EDIT_SUCCESS,
  USER_PROFILE_EDIT_REQUEST,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  USER_REGISTER_RESET
} from '../constants/userConstants';
import axios from 'axios';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/auth/signin`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });
  }
};

export const register =
  (name, email, password, username) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST
      });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        { name, email, password, username },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message
      });
    }
  };

export const verify = (token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFY_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/auth/verify?token=${token}`,
      config
    );

    dispatch({
      type: USER_VERIFY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const update =
  (id, name, dp, password, location, bio) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_PROFILE_EDIT_REQUEST
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
        `${BASE_URL}/api/auth/user/${id}/update`,
        { name, dp, password, location, bio },
        config
      );

      dispatch({
        type: USER_PROFILE_EDIT_SUCCESS
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_PROFILE_EDIT_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message
      });
    }
  };

export const logOut = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGIN_LOGOUT });
};

export const getAllUserAction =
  (pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_USER_REQUEST
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
        `${BASE_URL}/api/auth/users?pageNo=${pageNo}&pageSize=${pageSize}`,
        config
      );

      dispatch({
        type: GET_ALL_USER_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

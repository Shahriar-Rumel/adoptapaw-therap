import axios from 'axios';
import {
  MISSING_POSTS_BY_USERID_FAIL,
  MISSING_POSTS_BY_USERID_REQUEST,
  MISSING_POSTS_BY_USERID_SUCCESS,
  MISSING_POST_BY_ID_FAIL,
  MISSING_POST_BY_ID_REQUEST,
  MISSING_POST_BY_ID_SUCCESS,
  MISSING_POST_CREATE_FAIL,
  MISSING_POST_CREATE_REQUEST,
  MISSING_POST_CREATE_SUCCESS,
  MISSING_POST_DELETE_FAIL,
  MISSING_POST_DELETE_REQUEST,
  MISSING_POST_DELETE_SUCCESS,
  MISSING_POST_EDIT_FAIL,
  MISSING_POST_EDIT_REQUEST,
  MISSING_POST_EDIT_SUCCESS,
  MISSING_POST_FAIL,
  MISSING_POST_REQUEST,
  MISSING_POST_SUCCESS
} from '../constants/missingAnimalConstants';

const BASE_URL = 'http://localhost:8081/api/missing';

export const missingPostsAction = (pageNo, pageSize) => async (dispatch) => {
  try {
    dispatch({
      type: MISSING_POST_REQUEST
    });

    const { data } = await axios.get(
      `${BASE_URL}/all?pageNo=${pageNo}&pageSize=${pageSize}`
    );

    dispatch({
      type: MISSING_POST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MISSING_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const missingPostByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MISSING_POST_BY_ID_REQUEST
    });

    const { data } = await axios.get(`${BASE_URL}/${id}`);

    dispatch({
      type: MISSING_POST_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MISSING_POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const missingPostByUserIdAction =
  (id, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MISSING_POSTS_BY_USERID_REQUEST
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
        `${BASE_URL}/user/${id}?pageNo=${pageNo}&pageSize=${pageSize}`,
        config
      );

      dispatch({
        type: MISSING_POSTS_BY_USERID_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: MISSING_POSTS_BY_USERID_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message
      });
    }
  };

export const missingPostCreateAction =
  (id, dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MISSING_POST_CREATE_REQUEST
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

      await axios.post(`${BASE_URL}/${id}/createmissingpost`, dataport, config);

      dispatch({
        type: MISSING_POST_CREATE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: MISSING_POST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const missingPostUpdateAction =
  (id, dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MISSING_POST_EDIT_REQUEST
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

      const { data } = await axios.put(`${BASE_URL}/${id}`, dataport, config);

      dispatch({
        type: MISSING_POST_EDIT_SUCCESS
      });
      dispatch({
        type: MISSING_POST_BY_ID_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: MISSING_POST_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const missingPostDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MISSING_POST_DELETE_REQUEST
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

    await axios.delete(`${BASE_URL}/${id}`, config);

    dispatch({
      type: MISSING_POST_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: MISSING_POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

import axios from 'axios';
import {
  ADOPTION_POSTS_BY_USERID_FAIL,
  ADOPTION_POSTS_BY_USERID_REQUEST,
  ADOPTION_POSTS_BY_USERID_SUCCESS,
  ADOPTION_POST_BY_ID_FAIL,
  ADOPTION_POST_BY_ID_REQUEST,
  ADOPTION_POST_BY_ID_SUCCESS,
  ADOPTION_POST_CREATE_FAIL,
  ADOPTION_POST_CREATE_REQUEST,
  ADOPTION_POST_CREATE_SUCCESS,
  ADOPTION_POST_DELETE_FAIL,
  ADOPTION_POST_DELETE_REQUEST,
  ADOPTION_POST_DELETE_RESET,
  ADOPTION_POST_DELETE_SUCCESS,
  ADOPTION_POST_FAIL,
  ADOPTION_POST_REQUEST,
  ADOPTION_POST_SUCCESS,
  ADOPTION_POST_UPDATE_FAIL,
  ADOPTION_POST_UPDATE_REQUEST,
  ADOPTION_POST_UPDATE_SUCCESS,
  ADOPTION_REQUEST_FAIL,
  ADOPTION_REQUEST_REQUEST,
  ADOPTION_REQUEST_SUCCESS
} from '../constants/adoptionConstants';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL + '/api/adoption';

export const adoptionPostsAction = (pageNo, pageSize) => async (dispatch) => {
  try {
    dispatch({
      type: ADOPTION_POST_REQUEST
    });

    const { data } = await axios.get(
      `${BASE_URL}/all?pageNo=${pageNo}&pageSize=${pageSize}`
    );

    dispatch({
      type: ADOPTION_POST_SUCCESS,
      payload: data
    });

    // localStorage.setItem('adoptionPosts', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADOPTION_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const adoptionPostByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADOPTION_POST_BY_ID_REQUEST
    });

    const { data } = await axios.get(`${BASE_URL}/${id}`);

    dispatch({
      type: ADOPTION_POST_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADOPTION_POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const adoptionPostByUserIdAction =
  (id, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADOPTION_POSTS_BY_USERID_REQUEST
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
        type: ADOPTION_POSTS_BY_USERID_SUCCESS,
        payload: data
      });

      // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADOPTION_POSTS_BY_USERID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
export const adoptionPostCreateAction =
  (id, dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADOPTION_POST_CREATE_REQUEST
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
        `${BASE_URL}/${id}/createadoptionpost`,
        dataport,
        config
      );

      dispatch({
        type: ADOPTION_POST_CREATE_SUCCESS
      });

      // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADOPTION_POST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const adoptionPostUpdateAction =
  (id, dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADOPTION_POST_UPDATE_REQUEST
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
        type: ADOPTION_POST_UPDATE_SUCCESS
      });
      dispatch({
        type: ADOPTION_POST_BY_ID_SUCCESS,
        payload: data
      });

      // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADOPTION_POST_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const adoptionRequestAction =
  (dataset, id, uid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADOPTION_REQUEST_REQUEST
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

      const { data } = await axios.post(
        `${BASE_URL}/${id}/user/${uid}/createadoptionrequest`,
        dataset,
        config
      );

      dispatch({
        type: ADOPTION_REQUEST_SUCCESS,
        payload: data
      });

      // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADOPTION_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const adoptionPostDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADOPTION_POST_DELETE_REQUEST
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
      type: ADOPTION_POST_DELETE_SUCCESS
    });
    // dispatch({
    //   type: ADOPTION_POST_DELETE_RESET
    // });

    // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADOPTION_POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

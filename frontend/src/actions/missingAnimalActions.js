import axios from 'axios';
import {
  MISSING_POSTS_BY_USERID_FAIL,
  MISSING_POSTS_BY_USERID_REQUEST,
  MISSING_POSTS_BY_USERID_SUCCESS,
  MISSING_POST_BY_ID_FAIL,
  MISSING_POST_BY_ID_REQUEST,
  MISSING_POST_BY_ID_SUCCESS,
  MISSING_POST_FAIL,
  MISSING_POST_REQUEST,
  MISSING_POST_SUCCESS
} from '../constants/missingAnimalConstants';

const BASE_URL = 'http://localhost:8081/api/missing';

export const missingPostsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: MISSING_POST_REQUEST
    });

    const { data } = await axios.get(`${BASE_URL}/all`);

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

    // localStorage.setItem('MISSINGPostByIdData', JSON.stringify(data));
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

export const missingPostByUserIdAction = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${BASE_URL}/user/${id}`, config);

    dispatch({
      type: MISSING_POSTS_BY_USERID_SUCCESS,
      payload: data
    });

    // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: MISSING_POSTS_BY_USERID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

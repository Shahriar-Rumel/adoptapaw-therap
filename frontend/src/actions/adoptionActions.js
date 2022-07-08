import axios from 'axios';
import {
  ADOPTION_POST_BY_ID_FAIL,
  ADOPTION_POST_BY_ID_REQUEST,
  ADOPTION_POST_BY_ID_SUCCESS,
  ADOPTION_POST_FAIL,
  ADOPTION_POST_REQUEST,
  ADOPTION_POST_SUCCESS
} from '../constants/adoptionConstants';

const BASE_URL = 'http://localhost:8081/api/adoption';

export const adoptionPostsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ADOPTION_POST_REQUEST
    });

    const { data } = await axios.get(`${BASE_URL}/all`);

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

    // localStorage.setItem('adoptionPostByIdData', JSON.stringify(data));
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

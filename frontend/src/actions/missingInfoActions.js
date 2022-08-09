import axios from 'axios';
import {
  MISSING_INFO_BY_ID_FAIL,
  MISSING_INFO_BY_ID_REQUEST,
  MISSING_INFO_BY_ID_SUCCESS,
  MISSING_INFO_FAIL,
  MISSING_INFO_REQUEST,
  MISSING_INFO_SUCCESS
} from '../constants/missingInfoConstants';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL + '/api/missing';

export const missingInfoCreateAction = (id, dataport) => async (dispatch) => {
  try {
    dispatch({
      type: MISSING_INFO_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await axios.post(`${BASE_URL}/${id}/create`, dataport, config);

    dispatch({
      type: MISSING_INFO_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: MISSING_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const missingInfoByIdAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MISSING_INFO_BY_ID_REQUEST
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

    const { data } = await axios.get(`${BASE_URL}/request/${id}`, config);

    dispatch({
      type: MISSING_INFO_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MISSING_INFO_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

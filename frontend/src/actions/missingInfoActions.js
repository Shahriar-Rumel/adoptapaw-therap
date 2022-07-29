import axios from 'axios';
import {
  MISSING_INFO_FAIL,
  MISSING_INFO_REQUEST,
  MISSING_INFO_SUCCESS
} from '../constants/missingInfoConstants';

const BASE_URL = 'http://localhost:8081/api/missing';

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

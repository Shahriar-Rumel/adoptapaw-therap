import {
  MISSING_INFO_FAIL,
  MISSING_INFO_REQUEST,
  MISSING_INFO_SUCCESS
} from '../constants/missingInfoConstants';

export const missingInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSING_INFO_REQUEST:
      return { loading: true };
    case MISSING_INFO_SUCCESS:
      return { loading: false, success: true };
    case MISSING_INFO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

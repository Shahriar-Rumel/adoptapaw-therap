import {
  MISSING_INFO_APPROVE_FAIL,
  MISSING_INFO_APPROVE_REQUEST,
  MISSING_INFO_APPROVE_RESET,
  MISSING_INFO_APPROVE_SUCCESS,
  MISSING_INFO_BY_ID_FAIL,
  MISSING_INFO_BY_ID_REQUEST,
  MISSING_INFO_BY_ID_SUCCESS,
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
export const missingInfoByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSING_INFO_BY_ID_REQUEST:
      return { loading: true };
    case MISSING_INFO_BY_ID_SUCCESS:
      return { loading: false, success: true, missingInfo: action.payload };
    case MISSING_INFO_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const missingInfoApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSING_INFO_APPROVE_REQUEST:
      return { loading: true };
    case MISSING_INFO_APPROVE_SUCCESS:
      return { loading: false, success: true };
    case MISSING_INFO_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    case MISSING_INFO_APPROVE_RESET:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import {
  ADMIN_ALL_ADOPTION_REQUEST_FAIL,
  ADMIN_ALL_ADOPTION_REQUEST_REQUEST,
  ADMIN_ALL_ADOPTION_REQUEST_SUCCESS,
  ADMIN_ALL_MISSING_INFO_FAIL,
  ADMIN_ALL_MISSING_INFO_REQUEST,
  ADMIN_ALL_MISSING_INFO_SUCCESS,
  ADMIN_STATS_FAIL,
  ADMIN_STATS_REQUEST,
  ADMIN_STATS_SUCCESS,
  ADMIN_USER_BAN_FAIL,
  ADMIN_USER_BAN_REQUEST,
  ADMIN_USER_BAN_SUCCESS
} from '../constants/adminConstants';
import {
  ADOPTION_REQUEST_APPROVE_FAIL,
  ADOPTION_REQUEST_APPROVE_REQUEST,
  ADOPTION_REQUEST_APPROVE_RESET,
  ADOPTION_REQUEST_APPROVE_SUCCESS
} from '../constants/adoptionRequestConstants';

export const adminStatReducer = (state = { adminStat: [] }, action) => {
  switch (action.type) {
    case ADMIN_STATS_REQUEST:
      return { loading: true, adminStat: [] };
    case ADMIN_STATS_SUCCESS:
      return { loading: false, adminStat: action.payload };
    case ADMIN_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminUserBanReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_BAN_REQUEST:
      return { loading: true };
    case ADMIN_USER_BAN_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_USER_BAN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminAllAdoptionRequestReducer = (
  state = { adoptionRequests: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_ALL_ADOPTION_REQUEST_REQUEST:
      return { loading: true, adoptionRequests: [] };
    case ADMIN_ALL_ADOPTION_REQUEST_SUCCESS:
      return { loading: false, adoptionRequests: action.payload };
    case ADMIN_ALL_ADOPTION_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminAdoptionRequestApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case ADOPTION_REQUEST_APPROVE_REQUEST:
      return { loading: true };
    case ADOPTION_REQUEST_APPROVE_SUCCESS:
      return { loading: false, success: true };
    case ADOPTION_REQUEST_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    case ADOPTION_REQUEST_APPROVE_RESET:
      return {};
    default:
      return state;
  }
};

export const adminAllMissingInformationReducer = (
  state = { missingInformations: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_ALL_MISSING_INFO_REQUEST:
      return { loading: true, missingInformations: [] };
    case ADMIN_ALL_MISSING_INFO_SUCCESS:
      return { loading: false, missingInformations: action.payload };
    case ADMIN_ALL_MISSING_INFO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

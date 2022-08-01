import {
  ADMIN_STATS_FAIL,
  ADMIN_STATS_REQUEST,
  ADMIN_STATS_SUCCESS
} from '../constants/adminConstants';

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

import {
  DONATION_BY_USERID_FAIL,
  DONATION_BY_USERID_REQUEST,
  DONATION_BY_USERID_SUCCESS,
  DONATION_CREATE_FAIL,
  DONATION_CREATE_REQUEST,
  DONATION_CREATE_RESET,
  DONATION_CREATE_SUCCESS
} from '../constants/donationConstants';

export const donationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_CREATE_REQUEST:
      return { loading: true };
    case DONATION_CREATE_SUCCESS:
      return { loading: false, success: true, donation: action.payload };
    case DONATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const donationByUserIdReducer = (
  state = { donationsByUserId: [] },
  action
) => {
  switch (action.type) {
    case DONATION_BY_USERID_REQUEST:
      return { loading: true, donationsByUserId: [] };
    case DONATION_BY_USERID_SUCCESS:
      return { loading: false, donationsByUserId: action.payload };
    case DONATION_BY_USERID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

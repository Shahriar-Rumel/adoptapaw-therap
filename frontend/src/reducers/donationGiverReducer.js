import {
  DONATION_GIVER_CREATE_FAIL,
  DONATION_GIVER_CREATE_REQUEST,
  DONATION_GIVER_CREATE_RESET,
  DONATION_GIVER_CREATE_SUCCESS
} from '../constants/donationGiverConstants';

export const donationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_GIVER_CREATE_REQUEST:
      return { loading: true };
    case DONATION_GIVER_CREATE_SUCCESS:
      return { loading: false, success: true, donationGiver: action.payload };
    case DONATION_GIVER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_GIVER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

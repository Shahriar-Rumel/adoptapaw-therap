import {
  ADOPTION_REQUESTS_BY_USERID_FAIL,
  ADOPTION_REQUESTS_BY_USERID_REQUEST,
  ADOPTION_REQUESTS_BY_USERID_SUCCESS,
  ADOPTION_REQUEST_BY_ID_FAIL,
  ADOPTION_REQUEST_BY_ID_REQUEST,
  ADOPTION_REQUEST_BY_ID_SUCCESS
} from '../constants/adoptionRequestConstants';

export const adoptionRequestsByUserIdReducer = (
  state = { adoptionRequestsByUserId: [] },
  action
) => {
  switch (action.type) {
    case ADOPTION_REQUESTS_BY_USERID_REQUEST:
      return { loading: true, adoptionRequestsByUserId: [] };
    case ADOPTION_REQUESTS_BY_USERID_SUCCESS:
      return { loading: false, adoptionRequestsByUserId: action.payload };
    case ADOPTION_REQUESTS_BY_USERID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adoptionRequestByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ADOPTION_REQUEST_BY_ID_REQUEST:
      return { loading: true };
    case ADOPTION_REQUEST_BY_ID_SUCCESS:
      return { loading: false, adoptionRequest: action.payload };
    case ADOPTION_REQUEST_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

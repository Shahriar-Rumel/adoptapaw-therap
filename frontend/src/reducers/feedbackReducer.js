import {
  FEEDBACK_CREATE_FAIL,
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS
} from '../constants/feedbackConstants';

export const feedbackCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_CREATE_REQUEST:
      return { loading: true };
    case FEEDBACK_CREATE_SUCCESS:
      return { loading: false, success: true };
    case FEEDBACK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

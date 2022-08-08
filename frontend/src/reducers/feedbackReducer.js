import {
  FEEDBACK_CREATE_FAIL,
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_FAIL,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS
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

export const feedbackReducer = (state = { feedbacks: {} }, action) => {
  switch (action.type) {
    case FEEDBACK_REQUEST:
      return { loading: true, feedbacks: {} };
    case FEEDBACK_SUCCESS:
      return { loading: false, feedbacks: action.payload };
    case FEEDBACK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import {
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_FAIL,
  PASSWORD_RESET_REQUEST_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_SUCCESS
} from '../constants/passwordResetConstant';

export const passwordResetRquestReducer = (
  state = { passwordResetRequest: {} },
  action
) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST_REQUEST:
      return { loading: true, passwordResetRequest: {} };
    case PASSWORD_RESET_REQUEST_SUCCESS:
      return { loading: false, passwordResetRequest: action.payload };
    case PASSWORD_RESET_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const passwordResetReducer = (state = { passwordReset: {} }, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return { loading: true, passwordReset: {} };
    case PASSWORD_RESET_SUCCESS:
      return { loading: false, success: true, passwordReset: action.payload };
    case PASSWORD_RESET_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

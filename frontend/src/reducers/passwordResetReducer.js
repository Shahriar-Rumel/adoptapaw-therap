import {
  PASSWORD_RESET_REQUEST_FAIL,
  PASSWORD_RESET_REQUEST_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS
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

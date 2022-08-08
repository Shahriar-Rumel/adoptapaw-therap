import {
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_PROFILE_EDIT_FAIL,
  USER_PROFILE_EDIT_REQUEST,
  USER_PROFILE_EDIT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, success: false };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userProfileEditReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_EDIT_REQUEST:
      return { loading: true };
    case USER_PROFILE_EDIT_SUCCESS:
      return { loading: false, success: true };

    case USER_PROFILE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true, success: false };
    case USER_VERIFY_SUCCESS:
      return { loading: false, success: true };
    case USER_VERIFY_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
      return { loading: true };
    case GET_ALL_USER_SUCCESS:
      return { loading: false, allUser: action.payload };
    case GET_ALL_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

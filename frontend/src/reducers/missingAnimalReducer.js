import {
  MISSING_POSTS_BY_USERID_FAIL,
  MISSING_POSTS_BY_USERID_REQUEST,
  MISSING_POSTS_BY_USERID_SUCCESS,
  MISSING_POST_BY_ID_FAIL,
  MISSING_POST_BY_ID_REQUEST,
  MISSING_POST_BY_ID_SUCCESS,
  MISSING_POST_CREATE_FAIL,
  MISSING_POST_CREATE_REQUEST,
  MISSING_POST_CREATE_RESET,
  MISSING_POST_CREATE_SUCCESS,
  MISSING_POST_DELETE_FAIL,
  MISSING_POST_DELETE_REQUEST,
  MISSING_POST_DELETE_RESET,
  MISSING_POST_DELETE_SUCCESS,
  MISSING_POST_EDIT_FAIL,
  MISSING_POST_EDIT_REQUEST,
  MISSING_POST_EDIT_SUCCESS,
  MISSING_POST_FAIL,
  MISSING_POST_REQUEST,
  MISSING_POST_SUCCESS
} from '../constants/missingAnimalConstants';

export const missingAllPostReducer = (state = { missingPosts: [] }, action) => {
  switch (action.type) {
    case MISSING_POST_REQUEST:
      return { loading: true, missingPosts: [] };
    case MISSING_POST_SUCCESS:
      return { loading: false, missingPosts: action.payload };
    case MISSING_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const missingPostByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSING_POST_BY_ID_REQUEST:
      return { loading: true };
    case MISSING_POST_BY_ID_SUCCESS:
      return { loading: false, missingPostById: action.payload };
    case MISSING_POST_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const missingPostsByUserIdReducer = (
  state = { missingPostByUserId: [] },
  action
) => {
  switch (action.type) {
    case MISSING_POSTS_BY_USERID_REQUEST:
      return { loading: true, missingPostByUserId: [] };
    case MISSING_POSTS_BY_USERID_SUCCESS:
      return { loading: false, missingPostByUserId: action.payload };
    case MISSING_POSTS_BY_USERID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const missingPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSING_POST_CREATE_REQUEST:
      return { loading: true };
    case MISSING_POST_CREATE_SUCCESS:
      return { loading: false, success: true, missingPost: action.payload };
    case MISSING_POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MISSING_POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const missingPostUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSING_POST_EDIT_REQUEST:
      return { loading: true };
    case MISSING_POST_EDIT_SUCCESS:
      return { loading: false, success: true };
    case MISSING_POST_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const missingPostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSING_POST_DELETE_REQUEST:
      return { loading: true };
    case MISSING_POST_DELETE_SUCCESS:
      return { loading: false, success: true };

    case MISSING_POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case MISSING_POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

import {
  ADOPTION_POST_BY_ID_FAIL,
  ADOPTION_POST_BY_ID_REQUEST,
  ADOPTION_POST_BY_ID_SUCCESS,
  ADOPTION_POST_CREATE_REQUEST,
  ADOPTION_POST_CREATE_RESET,
  ADOPTION_POST_CREATE_SUCCESS,
  ADOPTION_POST_FAIL,
  ADOPTION_POST_REQUEST,
  ADOPTION_POST_SUCCESS,
  ADOPTION_POSTS_BY_USERID_REQUEST,
  ADOPTION_POSTS_BY_USERID_SUCCESS,
  ADOPTION_POSTS_BY_USERID_FAIL,
  ADOPTION_POST_CREATE_FAIL,
  ADOPTION_REQUEST_REQUEST,
  ADOPTION_REQUEST_SUCCESS,
  ADOPTION_REQUEST_FAIL,
  ADOPTION_REQUEST_RESET,
  ADOPTION_POST_UPDATE_REQUEST,
  ADOPTION_POST_UPDATE_SUCCESS,
  ADOPTION_POST_UPDATE_FAIL,
  ADOPTION_POST_DELETE_REQUEST,
  ADOPTION_POST_DELETE_SUCCESS,
  ADOPTION_POST_DELETE_FAIL,
  ADOPTION_POST_DELETE_RESET
} from '../constants/adoptionConstants';

export const adoptionAllPostReducer = (
  state = { adoptionPosts: [] },
  action
) => {
  switch (action.type) {
    case ADOPTION_POST_REQUEST:
      return { loading: true, adoptionPosts: [] };
    case ADOPTION_POST_SUCCESS:
      return { loading: false, adoptionPosts: action.payload };
    case ADOPTION_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adoptionAdoptionPostByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ADOPTION_POST_BY_ID_REQUEST:
      return { loading: true };
    case ADOPTION_POST_BY_ID_SUCCESS:
      return { loading: false, adoptionPostById: action.payload };
    case ADOPTION_POST_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adoptionPostsByUserIdReducer = (
  state = { adoptionPostByUserId: [] },
  action
) => {
  switch (action.type) {
    case ADOPTION_POSTS_BY_USERID_REQUEST:
      return { loading: true, adoptionPostByUserId: [] };
    case ADOPTION_POSTS_BY_USERID_SUCCESS:
      return { loading: false, adoptionPostByUserId: action.payload };
    case ADOPTION_POSTS_BY_USERID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adoptionPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADOPTION_POST_CREATE_REQUEST:
      return { loading: true };
    case ADOPTION_POST_CREATE_SUCCESS:
      return { loading: false, success: true, adoptionPost: action.payload };

    case ADOPTION_POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADOPTION_POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const adoptionPostUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADOPTION_POST_UPDATE_REQUEST:
      return { loading: true, success: false };
    case ADOPTION_POST_UPDATE_SUCCESS:
      return { loading: false, success: true, adoptionPost: action.payload };

    case ADOPTION_POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const adoptionRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ADOPTION_REQUEST_REQUEST:
      return { loading: true, success: false };
    case ADOPTION_REQUEST_SUCCESS:
      return { loading: false, success: true };
    case ADOPTION_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case ADOPTION_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};

export const adoptionPostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADOPTION_POST_DELETE_REQUEST:
      return { loading: true };
    case ADOPTION_POST_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ADOPTION_POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ADOPTION_POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

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
  ADOPTION_POST_CREATE_FAIL
} from '../constants/adoptionConstants';

export const adoptionAllPostReducer = (
  state = { adoptionPosts: [] },
  action
) => {
  switch (action.type) {
    case ADOPTION_POST_REQUEST:
      return { loading: true, adoptionPosts: [] };
    case ADOPTION_POST_SUCCESS:
      return { loading: false, adoptionPosts: action.payload.content };
    case ADOPTION_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adoptionAdoptionPostByIdReducer = (
  state = { adoptionPostById: {} },
  action
) => {
  switch (action.type) {
    case ADOPTION_POST_BY_ID_REQUEST:
      return { loading: true, adoptionPostById: {} };
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

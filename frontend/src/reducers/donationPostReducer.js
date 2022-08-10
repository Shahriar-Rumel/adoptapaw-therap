import {
  DONATION_POSTS_FAIL,
  DONATION_POSTS_REQUEST,
  DONATION_POSTS_SUCCESS,
  DONATION_POST_BY_ID_FAIL,
  DONATION_POST_BY_ID_REQUEST,
  DONATION_POST_BY_ID_RESET,
  DONATION_POST_BY_ID_SUCCESS,
  DONATION_POST_CREATE_FAIL,
  DONATION_POST_CREATE_REQUEST,
  DONATION_POST_CREATE_RESET,
  DONATION_POST_CREATE_SUCCESS,
  DONATION_POST_DELETE_FAIL,
  DONATION_POST_DELETE_REQUEST,
  DONATION_POST_DELETE_RESET,
  DONATION_POST_DELETE_SUCCESS,
  DONATION_POST_UPDATE_FAIL,
  DONATION_POST_UPDATE_REQUEST,
  DONATION_POST_UPDATE_SUCCESS
} from '../constants/donationPostConstants';

export const donationPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_POST_CREATE_REQUEST:
      return { loading: true };
    case DONATION_POST_CREATE_SUCCESS:
      return { loading: false, success: true, donationPost: action.payload };

    case DONATION_POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const donationAllPostReducer = (
  state = { donationPosts: [] },
  action
) => {
  switch (action.type) {
    case DONATION_POSTS_REQUEST:
      return { loading: true, donationPosts: [] };
    case DONATION_POSTS_SUCCESS:
      return { loading: false, donationPosts: action.payload };
    case DONATION_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const donationPostByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_POST_BY_ID_REQUEST:
      return { loading: true };
    case DONATION_POST_BY_ID_SUCCESS:
      return { loading: false, donationPostById: action.payload };
    case DONATION_POST_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_POST_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const donationPostUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_POST_UPDATE_REQUEST:
      return { loading: true };
    case DONATION_POST_UPDATE_SUCCESS:
      return { loading: false, success: true, donationPost: action.payload };

    case DONATION_POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const donationPostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_POST_DELETE_REQUEST:
      return { loading: true };
    case DONATION_POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DONATION_POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

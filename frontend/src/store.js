import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userProfileEditReducer,
  userRegisterReducer
} from './reducers/userReducer';
import {
  adoptionAdoptionPostByIdReducer,
  adoptionAllPostReducer,
  adoptionPostCreateReducer,
  adoptionPostsByUserIdReducer,
  adoptionPostUpdateReducer,
  adoptionRequestReducer
} from './reducers/adoptionReducer';
import {
  adoptionRequestByIdReducer,
  adoptionRequestsByUserIdReducer
} from './reducers/adoptionRequestReducer';
import {
  missingAllPostReducer,
  missingPostByIdReducer,
  missingPostCreateReducer,
  missingPostsByUserIdReducer,
  missingPostUpdateReducer
} from './reducers/missingAnimalReducer';
import {
  passwordResetReducer,
  passwordResetRquestReducer
} from './reducers/passwordResetReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userProfileEditReducer,
  adoptionPosts: adoptionAllPostReducer,
  adoptionPostByIdStore: adoptionAdoptionPostByIdReducer,
  adoptionPostCreated: adoptionPostCreateReducer,
  adoptionPostsByUserId: adoptionPostsByUserIdReducer,
  adoptionRequstCreated: adoptionRequestReducer,
  adoptionRequestsByUserId: adoptionRequestsByUserIdReducer,
  adoptionRequestById: adoptionRequestByIdReducer,
  missingPostsStore: missingAllPostReducer,
  missingPostByIdStore: missingPostByIdReducer,
  missingPostsByUserId: missingPostsByUserIdReducer,
  passwordResetRequestStore: passwordResetRquestReducer,
  passwordResetStore: passwordResetReducer,
  adoptionPostUpdateStore: adoptionPostUpdateReducer,
  missingPostCreated: missingPostCreateReducer,
  missingPostUpdateStore: missingPostUpdateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import {
  getAllUserAction,
  getAllUserReducer,
  userLoginReducer,
  userProfileEditReducer,
  userRegisterReducer,
  userVerifyReducer
} from './reducers/userReducer';
import {
  adoptionAdoptionPostByIdReducer,
  adoptionAllPostReducer,
  adoptionPostCreateReducer,
  adoptionPostDeleteReducer,
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
  missingPostDeleteReducer,
  missingPostsByUserIdReducer,
  missingPostUpdateReducer
} from './reducers/missingAnimalReducer';
import {
  passwordResetReducer,
  passwordResetRquestReducer
} from './reducers/passwordResetReducer';
import {
  donationAllPostReducer,
  donationPostByIdReducer,
  donationPostCreateReducer,
  donationPostUpdateReducer
} from './reducers/donationPostReducer';
import {
  donationByUserIdReducer,
  donationCreateReducer
} from './reducers/donationReducer';
import { feedbackCreateReducer } from './reducers/feedbackReducer';
import {
  missingInfoApproveReducer,
  missingInfoByIdReducer,
  missingInfoReducer
} from './reducers/missingInfoReducer';
import {
  adminAdoptionRequestApproveReducer,
  adminAllAdoptionRequestReducer,
  adminAllMissingInformationReducer,
  adminStatReducer,
  adminUserBanReducer
} from './reducers/adminReducer';

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
  missingPostUpdateStore: missingPostUpdateReducer,
  donationPostCreated: donationPostCreateReducer,
  donationPosts: donationAllPostReducer,
  donationPostByIdStore: donationPostByIdReducer,
  donationPostUpdateStore: donationPostUpdateReducer,
  donationStore: donationCreateReducer,
  adoptionPostDelete: adoptionPostDeleteReducer,
  missingPostDelete: missingPostDeleteReducer,
  userVerify: userVerifyReducer,
  feedbackCreate: feedbackCreateReducer,
  missingInfo: missingInfoReducer,
  donationByUserId: donationByUserIdReducer,
  allUsers: getAllUserReducer,
  adminStats: adminStatReducer,
  adminUserBan: adminUserBanReducer,
  adminAllAdoptionRequest: adminAllAdoptionRequestReducer,
  adoptionRequestApprove: adminAdoptionRequestApproveReducer,
  adminAllMissingInfo: adminAllMissingInformationReducer,
  missingInfoByIdStore: missingInfoByIdReducer,
  missingInfoApprove: missingInfoApproveReducer
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

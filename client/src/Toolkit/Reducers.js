// reducers.js

import { SET_USER_INFO, UPDATE_BALANCE } from './ActionTypes';

const initialState = {
  username: '',
  id: '',
  profile: '',
  walletAddress: '',
  balance: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
        profile: action.payload.profile,
        walletAddress: action.payload.walletAddress
      };
    case UPDATE_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;

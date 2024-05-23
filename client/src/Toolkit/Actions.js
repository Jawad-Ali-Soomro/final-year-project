// actions.js

import { SET_USER_INFO, UPDATE_BALANCE } from './ActionTypes';

export const setUserInfo = (username, email, profile, walletAddress) => {
  return {
    type: SET_USER_INFO,
    payload: {
      username,
      email,
      profile,
      walletAddress
    }
  };
};

export const updateBalance = (balance) => {
  return {
    type: UPDATE_BALANCE,
    payload: balance
  };
};

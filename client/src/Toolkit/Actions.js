// actions.js

import { SET_USER_INFO, UPDATE_BALANCE } from './ActionTypes';

export const setUserInfo = ({username, id, profile, walletAddress}) => {
  return {
    type: SET_USER_INFO,
    payload: {
      username,
      id,
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

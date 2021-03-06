import types from "../constants/action-types";

export const loginBegin = () => ({
  type: types.LOGIN_BEGIN
});

export const setCurrentUser = accountID => ({
  type: types.SET_CURRENT_USER,
  payload: { accountID }
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  payload: { error }
});

export const rememberMe = () => ({
  type: types.REMEMBER_ME
});

export const noRemember = () => ({
  type: types.NO_REMEMBER
});
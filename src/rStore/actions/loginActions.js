import types from "../constants/action-types";

export const loginBegin = () => ({
  type: types.LOGIN_BEGIN
});

export const loginSuccess = accountID => ({
  type: types.LOGIN_SUCCESS,
  payload: { accountID }
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  payload: { error }
});
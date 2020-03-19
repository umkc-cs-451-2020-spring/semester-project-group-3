import types from "../constants/action-types";

export const loginBegin = () => ({
  type: types.LOGIN_BEGIN
});

// email or acct number?
export const loginSuccess = email => ({
  type: types.LOGIN_SUCCESS,
  payload: { email }
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  payload: { error }
});
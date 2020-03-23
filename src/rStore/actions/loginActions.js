import types from "../constants/action-types";

export const loginBegin = () => ({
  type: types.LOGIN_BEGIN
});

export const setCurrentUser = login => ({
  type: types.SET_CURRENT_USER,
  payload: { login }
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  payload: { error }
});
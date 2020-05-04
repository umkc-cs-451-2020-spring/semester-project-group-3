import types from "../constants/action-types";

export const fetchNotificationsBegin = () => ({
  type: types.FETCH_NOTIFICATIONS_BEGIN,
});

export const fetchNotificationsSuccess = (notifications) => ({
  type: types.FETCH_NOTIFICATIONS_SUCCESS,
  payload: { notifications },
});

export const fetchNotificationsFailure = (error) => ({
  type: types.FETCH_NOTIFICATIONS_FAILURE,
  payload: { error },
});

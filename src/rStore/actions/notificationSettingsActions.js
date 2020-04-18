import types from "../constants/action-types";

// Fetch
export const fetchNotificationSettingsBegin = () => ({
  type: types.FETCH_NOTIFICATIONS_BEGIN,
});
export const fetchNotificationSettingsSuccess = (settings) => ({
  type: types.FETCH_NOTIFICATIONS_SUCCESS,
  payload: { settings },
});
export const fetchNotificationSettingsFailure = (error) => ({
  type: types.FETCH_NOTIFICATIONS_FAILURE,
  payload: { error },
});

// Post
export const postNotificationSettingsBegin = () => ({
  type: types.FETCH_NOTIFICATIONS_BEGIN,
});
export const postNotificationSettingsSuccess = (settings) => ({
  type: types.FETCH_NOTIFICATIONS_SUCCESS,
  payload: { settings },
});
export const postNotificationSettingsFailure = (error) => ({
  type: types.FETCH_NOTIFICATIONS_FAILURE,
  payload: { error },
});

// Delete
export const deleteNotificationSettingsBegin = () => ({
  type: types.FETCH_NOTIFICATIONS_BEGIN,
});
export const deleteNotificationSettingsSuccess = (settings) => ({
  type: types.FETCH_NOTIFICATIONS_SUCCESS,
  payload: { settings },
});
export const deleteNotificationSettingsFailure = (error) => ({
  type: types.FETCH_NOTIFICATIONS_FAILURE,
  payload: { error },
});

// Update
export const updateNotificationSettingsBegin = () => ({
  type: types.FETCH_NOTIFICATIONS_BEGIN,
});
export const updateNotificationSettingsSuccess = (settings) => ({
  type: types.FETCH_NOTIFICATIONS_SUCCESS,
  payload: { settings },
});
export const updateNotificationSettingsFailure = (error) => ({
  type: types.FETCH_NOTIFICATIONS_FAILURE,
  payload: { error },
});

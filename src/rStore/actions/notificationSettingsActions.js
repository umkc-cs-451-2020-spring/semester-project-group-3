import types from "../constants/action-types";

// Fetch
export const fetchNotificationSettingsBegin = () => ({
  type: types.FETCH_NOTIFICATION_SETTINGS_BEGIN,
});
export const fetchNotificationSettingsSuccess = (settings) => ({
  type: types.FETCH_NOTIFICATION_SETTINGS_SUCCESS,
  payload: { settings },
});
export const fetchNotificationSettingsFailure = (error) => ({
  type: types.FETCH_NOTIFICATION_SETTINGS_FAILURE,
  payload: { error },
});

// Post
export const postNotificationSettingsBegin = () => ({
  type: types.POST_NOTIFICATION_SETTINGS_BEGIN,
});
export const postNotificationSettingsSuccess = (settings) => ({
  type: types.POST_NOTIFICATION_SETTINGS_SUCCESS,
  payload: { settings },
});
export const postNotificationSettingsFailure = (error) => ({
  type: types.POST_NOTIFICATION_SETTINGS_FAILURE,
  payload: { error },
});

// Delete
export const deleteNotificationSettingsBegin = () => ({
  type: types.DELETE_NOTIFICATION_SETTINGS_BEGIN,
});
export const deleteNotificationSettingsSuccess = (settings) => ({
  type: types.DELETE_NOTIFICATION_SETTINGS_SUCCESS,
  payload: { settings },
});
export const deleteNotificationSettingsFailure = (error) => ({
  type: types.DELETE_NOTIFICATION_SETTINGS_FAILURE,
  payload: { error },
});

// Update
export const updateNotificationSettingsBegin = () => ({
  type: types.UPDATE_NOTIFICATION_SETTINGS_BEGIN,
});
export const updateNotificationSettingsSuccess = (settings) => ({
  type: types.UPDATE_NOTIFICATION_SETTINGS_SUCCESS,
  payload: { settings },
});
export const updateNotificationSettingsFailure = (error) => ({
  type: types.UPDATE_NOTIFICATION_SETTINGS_FAILURE,
  payload: { error },
});

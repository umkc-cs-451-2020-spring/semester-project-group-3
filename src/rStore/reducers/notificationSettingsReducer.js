import types from "../constants/action-types";

const initialState = {
  items: [],
  delete_message: "",
  post_message: "",
  update_message: "",

  fetch_loading: false,
  post_loading: false,
  update_loading: false,
  delete_loading: false,

  fetch_error: null,
  post_error: null,
  update_error: null,
  delete_error: null,
};

function notificationSettingsReducer(state = initialState, action) {
  switch (action.type) {
    // FETCH *******************************************************************
    case types.FETCH_NOTIFICATION_SETTINGS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      return {
        ...state,
        fetch_loading: true
      };
    case types.FETCH_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        fetch_loading: false,
        items: action.payload.settings
      };
    case types.FETCH_NOTIFICATION_SETTINGS_FAILURE:
      return {
        ...state,
        fetch_loading: false,
        fetch_error: action.payload.error,
        items: []
      };
    // POST *******************************************************************
    case types.POST_NOTIFICATION_SETTINGS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      return {
        ...state,
        post_loading: true
      };
    case types.POST_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        post_loading: false,
        post_message: action.payload.settings
      };
    case types.POST_NOTIFICATION_SETTINGS_FAILURE:
      return {
        ...state,
        post_loading: false,
        post_error: action.payload.error,
        post_message: ""
      };
    // Update ******************************************************************
    case types.UPDATE_NOTIFICATION_SETTINGS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      return {
        ...state,
        update_loading: true
      };
    case types.UPDATE_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        update_loading: false,
        notif_items: action.payload.settings
      };
    case types.UPDATE_NOTIFICATION_SETTINGS_FAILURE:
      return {
        ...state,
        update_loading: false,
        update_error: action.payload.error,
        update_message: ""
      };
    // Delete ******************************************************************
    case types.DELETE_NOTIFICATION_SETTINGS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      return {
        ...state,
        delete_loading: true
      };
    case types.DELETE_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_message: action.payload.settings
      };
    case types.DELETE_NOTIFICATION_SETTINGS_FAILURE:
      return {
        ...state,
        delete_loading: false,
        delete_error: action.payload.error,
        delete_message: ""
      };

    default:
      return state;
  }
}
export default notificationSettingsReducer;

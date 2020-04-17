import types from "../constants/action-types";

const initialState = {
  notif_items: [],
  notif_loading: false,
  notif_error: null,
};

function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_NOTIFICATIONS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      return {
        ...state,
        notif_loading: true,
        notif_error: null,
      };

    case types.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notif_loading: false,
        notif_items: action.payload.notifications,
      };

    case types.FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        notif_loading: false,
        notif_error: action.payload.error,
        notif_items: [],
      };

    default:
      return state;
  }
}
export default notificationsReducer;

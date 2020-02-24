import types from "../constants/action-types";
// Declare the initial state of anything in the store here
const initialState = {
  currentTab: 'Dashboard'
};

// add a switch case here for any added actions
function rootReducer(state = initialState, action) {
  switch(action.type) {
    case types.RENDER_DASHBOARD: {
      return {
        currentTab: "Dashboard"
      }
    }
    case types.RENDER_TRANSACTION: {
      return {
        currentTab: "Transaction"
      }
    }
    case types.RENDER_NOTIFICATION: {
      return {
        currentTab: "Notification"
      }
    }
    default: return state;
  }
}

export default rootReducer;

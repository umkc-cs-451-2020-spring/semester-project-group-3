import types from "../constants/action-types";
// Declare the initial state of anything in the store here
const initialState = {
  currentPage: "Login",
  currentTab: 'Dashboard'
};

// add a switch case here for any added actions
function rootReducer(state = initialState, action) {
  switch(action.type) {
    case types.RENDER_DASHBOARD: {
      return {
        currentPage: "App",
        currentTab: "Dashboard"
      }
    }
    case types.RENDER_TRANSACTION: {
      return {
        currentPage: "App",
        currentTab: "Transaction"
      }
    }
    case types.RENDER_NOTIFICATION: {
      return {
        currentPage: "App",
        currentTab: "Notification"
      }
    }
    case types.RENDER_APP: {
      return {
        currentPage: "App",
        currentTab: "Dashboard"
      }
    }
    default: return state;
  }
}

export default rootReducer;

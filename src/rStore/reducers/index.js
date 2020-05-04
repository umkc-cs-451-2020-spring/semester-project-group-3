import tabChangeReducer from "./tabChangeReducer.js";
import transactionsReducer from "./transactionsReducer.js";
import loginReducer from "./loginReducer.js";
import notificationsReducer from "./notificationsReducer.js";
import notificationSettingsReducer from "./notificationSettingsReducer.js"
import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

export default combineReducers({
  tabChangeReducer,
  transactionsReducer,
  loginReducer,
  notificationsReducer,
  notificationSettingsReducer,
  form: reduxFormReducer,
});

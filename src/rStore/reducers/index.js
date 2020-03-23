import tabChangeReducer from "./tabChangeReducer.js";
import transactionsReducer from "./transactionsReducer.js";
import loginReducer from "./loginReducer.js";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  tabChangeReducer,
  transactionsReducer,
  loginReducer,
  form: reduxFormReducer
});

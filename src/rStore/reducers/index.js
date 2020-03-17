import tabChangeReducer from "./tabChangeReducer.js";
import transactionsReducer from "./transactionsReducer.js";
import { combineReducers } from "redux";

export default combineReducers({
  tabChangeReducer,
  transactionsReducer
});

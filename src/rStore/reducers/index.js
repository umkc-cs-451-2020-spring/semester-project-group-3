import tabChangeReducer from "./tabChangeReducer.js";
import transactionsReducer from "./transactionsReducer.js";
import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  tabChangeReducer,
  transactionsReducer,
  form: reduxFormReducer
});

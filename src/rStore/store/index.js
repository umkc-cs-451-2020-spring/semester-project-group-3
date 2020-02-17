import rootReducer from "../reducers/index";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware
} from 'redux';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);


export default store;

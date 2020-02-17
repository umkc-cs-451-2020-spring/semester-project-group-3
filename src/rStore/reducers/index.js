import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ARTICLE: {
      break;
      //do something;
    }

    default: return state;
  }
}

export default rootReducer;

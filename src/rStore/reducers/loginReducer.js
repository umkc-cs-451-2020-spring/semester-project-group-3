import types from "../constants/action-types";

const initialState = {
  accountID: '',
  isLoggedIn: false,
  loading: false,
  error: null
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        accountID: action.payload.accountID,
        isLoggedIn: action.payload.isLoggedIn
      };
    case types.LOGIN_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            accountID: '',
            isLoggedIn: false
      };
        default:
          return state;
  }
}

export default loginReducer
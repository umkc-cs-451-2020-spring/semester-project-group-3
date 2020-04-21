import types from "../constants/action-types";

const initialState = {
  accountID: '',
  loading: false,
  error: null,
  rememberMe: false
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
      };
    case types.LOGIN_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
      };
    case types.LOGOUT:
        return {
          accountID: '',
          loading: false,
          error: null
      };
    case types.REMEMBER_ME:
        return {
          accountID: '',
          loading: false,
          error: null,
          rememberMe: true
      };
    case types.NO_REMEMBER:
        return {
          accountID: '',
          loading: false,
          error: null,
          rememberMe: false
      };
        default:
          return state;
  }
}

export default loginReducer
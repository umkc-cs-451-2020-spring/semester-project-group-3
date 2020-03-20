import types from "../constants/action-types";

const initialState = {
  accountID: '',
  loading: false,
  error: null
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
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
            accountID: ''
          };
    
        default:
          return state;
  }
}

export default loginReducer
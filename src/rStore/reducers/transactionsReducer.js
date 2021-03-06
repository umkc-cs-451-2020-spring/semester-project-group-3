import types from "../constants/action-types";

const initialState = {
  items: [],
  loading: false,
  error: null,
  type: ""
};

function transactionsReducer(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_TRANSACTIONS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.transactions
      };

    case types.FETCH_TRANSACTIONS_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

      case types.LOGOUT:

      return {
        items: [],
        loading: false,
        error: null
      };
      case types.TRANSACTION_TYPE:
      return {
        ...state,
        loading: false,
        type: action.payload.tt
      };
    default:
      return state;
  }
}
export default transactionsReducer;

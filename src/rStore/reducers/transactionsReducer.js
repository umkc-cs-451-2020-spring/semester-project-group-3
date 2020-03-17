import types from "../constants/action-types";

const initialState = {
  items: [],
  loading: false,
  error: null
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

    default:
      return state;
  }
}
export default transactionsReducer;

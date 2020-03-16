import types from "../constants/action-types";

export const fetchTransactionsBegin = () => ({
  type: types.FETCH_TRANSACTIONS_BEGIN
});

export const fetchTransactionsSuccess = products => ({
  type: types.FETCH_TRANSACTIONS_SUCCESS,
  payload: { products }
});

export const fetchTransactionsFailure = error => ({
  type: types.FETCH_TRANSACTIONS_FAILURE,
  payload: { error }
});

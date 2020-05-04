import types from "../constants/action-types";

export const fetchTransactionsBegin = () => ({
  type: types.FETCH_TRANSACTIONS_BEGIN
});

export const fetchTransactionsSuccess = transactions => ({
  type: types.FETCH_TRANSACTIONS_SUCCESS,
  payload: { transactions }
});

export const fetchTransactionsFailure = error => ({
  type: types.FETCH_TRANSACTIONS_FAILURE,
  payload: { error }
});
 export const transactionType = tt => ({
   type: types.TRANSACTION_TYPE,
   payload: {tt}
 })
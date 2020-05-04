import {
  fetchTransactionsBegin,
  fetchTransactionsSuccess,
  fetchTransactionsFailure } from "../../rStore/actions/transactionActions.js";

export default function fetchTransactions(acctID) {
  const axios = require('axios');
  return dispatch => {
    dispatch(fetchTransactionsBegin());
    axios.get('/transactions/' + acctID)
      .then(function(response) {
        console.log(response);
        dispatch(fetchTransactionsSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(fetchTransactionsFailure(error))
      });
  };
}

import {
  fetchTransactionsBegin,
  fetchTransactionsSuccess,
  fetchTransactionsFailure } from "../../rStore/actions/transactionActions.js";

// todo this will be passed an accound number. 
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
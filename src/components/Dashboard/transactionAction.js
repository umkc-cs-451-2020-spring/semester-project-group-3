import {
  fetchTransactionsBegin,
  fetchTransactionsSuccess,
  fetchTransactionsFailure } from "../../rStore/actions/transactionActions.js";

// todo this will be passed an accound number. 
export default function fetchTransactions(acctID) {
  return dispatch => {
    dispatch(fetchTransactionsBegin());
    return fetch("/transactions/" + acctID)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch(fetchTransactionsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchTransactionsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {

    throw Error(response.statusText);
  }
  return response;
}

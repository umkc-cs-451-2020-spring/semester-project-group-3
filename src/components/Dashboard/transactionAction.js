import { fetchTransactionsBegin, fetchTransactionsSuccess, fetchTransactionsFailure } from "../../rStore/actions/transactionActions.js";
export default function fetchTransactions() {
  return dispatch => {
    dispatch(fetchTransactionsBegin());
    return fetch("/transactions/211111110")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchTransactionsSuccess(json.transactions));
        return json.transactions;
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

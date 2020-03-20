import { 
    loginBegin,
    loginSuccess,
    loginFailure } from "../../rStore/actions/loginActions.js";

// todo this will be passed an accound number. 
export default function fetchAccountID(values) {
  return dispatch => {
    dispatch(loginBegin());
    return fetch("/email/test@gmail.com")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch(loginSuccess(json));
        return json;
      })
      .catch(error => dispatch(loginFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {

    throw Error(response.statusText);
  }
  return response;
}

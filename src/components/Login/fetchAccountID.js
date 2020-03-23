import { 
    loginBegin,
    setCurrentUser,
    loginFailure } from "../../rStore/actions/loginActions.js";

// this isn't right, i am going off what connor did for now
export default function fetchAccountID(email, password) {
  return dispatch => {
    dispatch(loginBegin());
    return fetch("/email/test@gmail.com")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        // should set current user acct id and logged id status
        dispatch(setCurrentUser(json));
        dispatch(renderApp());
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

import { 
    loginBegin,
    setCurrentUser,
    loginFailure } from "../../rStore/actions/loginActions.js";

// not sure if this is right
export default function fetchAccountID(values) {
  return dispatch => {
    dispatch(loginBegin());
    return fetch("login/",  
    { method: "POST", body: JSON.stringify(values)})
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        // should set current user acct id and logged in status
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

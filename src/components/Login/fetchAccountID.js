import { 
    loginBegin,
    setCurrentUser,
    loginFailure } from "../../rStore/actions/loginActions.js";

// not sure if this is right
export default function fetchAccountID(values) {
  return async dispatch => {
    dispatch(loginBegin());
    try {
      const response = await fetch("login/", { method: "post", body: JSON.stringify(values) });
      const res = await handleErrors(response);
      const json = res.json();
      console.log(json);
      // should set current user acct id and logged in status
      dispatch(setCurrentUser(json));
      dispatch(renderApp());
      return json;
    }
    catch (error) {
      return dispatch(loginFailure(error));
    }
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

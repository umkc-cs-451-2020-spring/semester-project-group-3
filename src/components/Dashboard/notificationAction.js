import {
  fetchNotificationsBegin,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} from "../../rStore/actions/notificationActions.js";

// todo this will be passed an account number.
export default function fetchNotifications(acctID) {
  const axios = require("axios");
  return (dispatch) => {
    dispatch(fetchNotificationsBegin());
    axios
      .get("/notifications/" + acctID)
      .then(function (response) {
        console.log(response);
        dispatch(fetchNotificationsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(fetchNotificationsFailure(error));
      });
  };
}

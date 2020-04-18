import {
  fetchNotificationSettingsBegin,
  fetchNotificationSettingsSuccess,
  fetchNotificationSettingsFailure
} from "../../rStore/actions/notificationSettingsActions.js";

// todo this will be passed an account number.
export default function fetchNotificationSettings(acctID) {
  const axios = require("axios");
  return (dispatch) => {
    dispatch(fetchNotificationSettingsBegin());
    axios
      .get("/notifications/" + acctID)
      .then(function (response) {
        console.log(response);
        dispatch(fetchNotificationSettingsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(fetchNotificationSettingsFailure(error));
      });
  };
}

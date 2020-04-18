import {
  postNotificationSettingsBegin,
  postNotificationSettingsSuccess,
  postNotificationSettingsFailure
} from "../../rStore/actions/notificationSettingsActions.js";

// todo this will be passed an account number.
export default function postNotificationSetting(acctID) {
  const axios = require("axios");
  return (dispatch) => {
    dispatch(postNotificationSettingsBegin());
    axios
      .get("/notifications/" + acctID)
      // Todo above gets changed
      .then(function (response) {
        console.log(response);
        dispatch(postNotificationSettingsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(postNotificationSettingsFailure(error));
      });
  };
}

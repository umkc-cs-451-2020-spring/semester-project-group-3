import {
  deleteNotificationSettingsBegin,
  deleteNotificationSettingsSuccess,
  deleteNotificationSettingsFailure
} from "../../rStore/actions/notificationSettingsActions.js";

// todo this will be passed an account number.
export default function deleteNotificationSetting(acctID) {
  const axios = require("axios");
  return (dispatch) => {
    dispatch(deleteNotificationSettingsBegin());
    axios
      .get("/notifications/" + acctID)
      // TODO above gets changed
      .then(function (response) {
        console.log(response);
        dispatch(deleteNotificationSettingsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(deleteNotificationSettingsFailure(error));
      });
  };
}

import {
  updateNotificationSettingsBegin,
  updateNotificationSettingsSuccess,
  updateNotificationSettingsFailure
} from "../../rStore/actions/notificationSettingsActions.js";

// todo this will be passed an account number.
export default function updateNotificationSetting(acctID) {
  const axios = require("axios");
  return (dispatch) => {
    dispatch(updateNotificationSettingsBegin());
    axios
      .get("/notifications/" + acctID)
      // Todo change the above
      .then(function (response) {
        console.log(response);
        dispatch(updateNotificationSettingsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(updateNotificationSettingsFailure(error));
      });
  };
}

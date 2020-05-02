import {
  updateNotificationSettingsBegin,
  updateNotificationSettingsSuccess,
  updateNotificationSettingsFailure
} from "../../../../../rStore/actions/notificationSettingsActions.js";

// todo this will be passed an account number.
export default function updateNotificationSetting(trigger) {
  const axios = require("axios");
  const jTriggers = JSON.stringify(trigger);
  console.log("inside postNotificationSetting" + jTriggers);
  return (dispatch) => {
    dispatch(updateNotificationSettingsBegin());
    axios
      .post("/notificationTriggers/update?triggers=" + jTriggers)
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

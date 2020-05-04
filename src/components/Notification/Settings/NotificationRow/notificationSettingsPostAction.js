import {
  postNotificationSettingsBegin,
  postNotificationSettingsSuccess,
  postNotificationSettingsFailure
} from "../../../../rStore/actions/notificationSettingsActions.js";

// todo this will be passed an account number.
export default function postNotificationSetting(triggers) {
  const axios = require("axios");
  const jTriggers = JSON.stringify(triggers);
  console.log("inside postNotificationSetting" + jTriggers);
  return (dispatch) => {
    dispatch(postNotificationSettingsBegin());
    axios
      .post("/notificationTriggers/?triggers=" + jTriggers)
      .then(function (response) {
        console.log(response);
        dispatch(postNotificationSettingsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(postNotificationSettingsFailure(error));
      });
  };
}

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
      .post("/notificationTriggers?account=" + account +"&type=" +
            type + "&amount=" + amount +"&value="+ value+"&startDate="
            + startDate + "&description=" + description)
      // Todo above gets changed and make sure it works
      .then(function (response) {
        console.log(response);
        dispatch(postNotificationSettingsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(postNotificationSettingsFailure(error));
      });
  };
}

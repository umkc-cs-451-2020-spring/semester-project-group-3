import {
  postNotificationSettingsBegin,
  postNotificationSettingsSuccess,
  postNotificationSettingsFailure
} from "../../rStore/actions/notificationSettingsActions.js";

// todo this will be passed an account number.
export default function postNotificationSetting(acctID,type, amount,value,startDate,description) {
  const axios = require("axios");
  return (dispatch) => {
    dispatch(postNotificationSettingsBegin());
    axios
      .post("/notificationTriggers?account=" + acctID +"&type=" +
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

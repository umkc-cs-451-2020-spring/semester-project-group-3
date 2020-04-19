import React from 'react';
import styled from 'styled-components';
import NotificationRow from '../NotificationRow';
import Settings from "../Settings";
import fetchNotificationSettings from "./notificationSettingsFetchAction.js";
import deleteNotificationSetting from "./notificationSettingsDeleteAction.js";
import updateNotificationSetting from "./notificationSettingsUpdateAction.js";
import { useSelector, useDispatch } from "react-redux";


const Outer = styled.div`
  width: 100%;
`
const Title = styled.div`
  width: 100%;
  font-size: 28px;
  text-align: left;
  border-bottom: 1px solid grey;
`
const Description = styled.div`
  width: 100%;
  font-size: 16px;
`



// balance Transactions description recurring

function Notification(){
  const dispatch = useDispatch();
  const acctID = useSelector((state) => state.loginReducer.accountID);


  async function getSettings() {
    await dispatch(fetchNotificationSettings(acctID));
  }
  // this is called after the component is rendered.
  React.useEffect(() => {
    getSettings();
  }, []);

  const fetch_loading = useSelector(
    (state) => state.notificationSettingsReducer.fetch_loading
  );
  console.log(fetch_loading);
  const fetch_error = useSelector(
    (state) => state.notificationSettingsReducer.fetch_error
  );
  // todo change above to a console.log
  const settingsArray = useSelector(
    (state) => state.notificationSettingsReducer.setting_items
  );



  if (fetch_loading ) {
    return <div>Loading...</div>;
  }
  else{
    return (
      <Outer>
        <Title>Notification Settings
          <Description>Add Notifications below by Category.</Description>
        </Title>
        <Settings rows={settingsArray}/>
      </Outer>

  );
  }
}

export default Notification;

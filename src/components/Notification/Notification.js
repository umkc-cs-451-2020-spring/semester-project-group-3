import React from 'react';
import styled from 'styled-components';
import NotificationRow from './Settings/NotificationRow';
import Settings from "./Settings";
import fetchNotificationSettings from "./notificationSettingsFetchAction.js";
import { useSelector, useDispatch } from "react-redux";


const Outer = styled.div`
  width: 100%;
`
const Title = styled.div`
  width: 100%;
  font-size: 28px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid grey;
  color: #ffffff;
`
const Description = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: normal;
  color: #ffffff;
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
  function reRenderSettings(){
    getSettings();
  }
  const fetch_loading = useSelector(
    (state) => state.notificationSettingsReducer.fetch_loading
  );
  console.log(fetch_loading);
  const fetch_error = useSelector(
    (state) => state.notificationSettingsReducer.fetch_error
  );
  // todo change above to a console.log
  const setting_items = useSelector(
    (state) => state.notificationSettingsReducer.items
  );



  if (fetch_loading ) {
    return <div><img src="/loading-spinner.svg" alt ="Loading" /></div>;
  }

  return (
    <Outer>
      <Title>Notification Settings
        <Description>Add Notifications below by Category.</Description>
      </Title>
      <Settings key={1} rows={setting_items} reRenderSettings={reRenderSettings}/>
    </Outer>

  );
}

export default Notification;

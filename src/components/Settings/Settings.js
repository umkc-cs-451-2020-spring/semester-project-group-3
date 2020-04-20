import React from 'react';
import styled from 'styled-components';
import NotificationRow from '../NotificationRow'

function Settings(props){
  const {rows, reRenderSettings} = props;
  console.log(rows);
  const tSettings = rows.filter(x=> x.type === "transactionAmountAbove");
  const bSettings = rows.filter(x=> x.type === "balanceBelow");
  const dSettings = rows.filter(x=> x.type === "descriptionContains");
  const rSettings = rows.filter(x=> x.type === "recurringDescription");

  return (
    <div>

      <NotificationRow key={"transactionAmountAbove1"} type="transactionAmountAbove" rows={tSettings} reRenderSettings={reRenderSettings}></NotificationRow>
      <NotificationRow key={"balanceBelow2"} type="balanceBelow" rows={bSettings} reRenderSettings={reRenderSettings}></NotificationRow>
      <NotificationRow key={"descriptionContains3"} type="descriptionContains" rows={dSettings} reRenderSettings={reRenderSettings}></NotificationRow>
      <NotificationRow key={"recurringDescription4"} type="recurringDescription" rows={rSettings} reRenderSettings={reRenderSettings}></NotificationRow>
    </div>
  );
}

export default Settings;

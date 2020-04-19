import React from 'react';
import styled from 'styled-components';
import NotificationRow from '../NotificationRow'

function Settings(props){
  const {rows} = props;
  console.log(rows);
  const tSettings = rows.filter(x=> x.type == "transactionAmount");
  const bSettings = rows.filter(x=> x.type == "balanceBelow");
  const dSettings = rows.filter(x=> x.type == "descriptionMatch");
  const rSettings = rows.filter(x=> x.type == "recurringCharge");

  return (
    <div>
      <NotificationRow key={1} type="Transaction" rows={tSettings}></NotificationRow>
      <NotificationRow key={2} type="Balance" rows={bSettings}></NotificationRow>
      <NotificationRow key={3} type="Description" rows={dSettings}></NotificationRow>
      <NotificationRow key={4} type="Recurring Alert" rows={rSettings}></NotificationRow>
    </div>
  );
}

export default Settings;

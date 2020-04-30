import React from 'react';
import styled from 'styled-components';
import NotificationRow from './NotificationRow'

function Settings(props){
  const {rows, reRenderSettings} = props;
  console.log(rows);
  const tSettings = rows.filter(x=> x.type === "transactionAmountAbove");
  const bSettings = rows.filter(x=> x.type === "balanceBelow");
  const dSettings = rows.filter(x=> x.type === "descriptionContains");
  const settings = [tSettings,bSettings,dSettings];
  const types = ["transactionAmountAbove", "balanceBelow", "descriptionContains"]
  const numbers = [0,1,2];
  const rowsOfSettings = numbers.map((number)=> (
    <NotificationRow key={number} type={types[number]} rows={settings[number]} reRenderSettings={reRenderSettings}/>
  ));

  return (

    <div>
      {rowsOfSettings}
    </div>
  );
}

export default Settings;

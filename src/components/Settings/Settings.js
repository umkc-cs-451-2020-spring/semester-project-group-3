import React from 'react';
import styled from 'styled-components';
import NotificationRow from '../NotificationRow'
function Settings(props){
  const {rows} = props;
  console.log(rows);
  // const tSettings = settingsArray.filter(x=> x.);
  // const bSettings = ;
  // const dSettings = ;
  // const rSettings = ;


  function createData(
    notificationTriggerID,
    active,
    amount,
    value,
    startDate,
    description
  ){
    return{ notificationTriggerID,
      active,
      amount,
      value,
      startDate,
      description }
  }
  function createRows(settings){
    var temptSettings =[];
    var tempbSettings =[];
    var tempdSettings =[];
    var temprSettings =[];
    for (var i =0; i < settings.length; i++){
      switch (settings[i].type) {
        case "transactionAmount":
          temptSettings.push(createData(
            settings[i].notificationTriggerID,
            settings[i].active,
            settings[i].amount,
            settings[i].value,
            settings[i].startDate,
            settings[i].description));
          break;
        case "balanceBelow":
          tempbSettings.push(createData(
            settings[i].notificationTriggerID,
            settings[i].active,
            settings[i].amount,
            settings[i].value,
            settings[i].startDate,
            settings[i].description));
          break;
        case "descriptionMatch":
          tempdSettings.push(createData(
            settings[i].notificationTriggerID,
            settings[i].active,
            settings[i].amount,
            settings[i].value,
            settings[i].startDate,
            settings[i].description));
          break;
        case "recurring":
          temprSettings.push(createData(
            settings[i].notificationTriggerID,
            settings[i].active,
            settings[i].amount,
            settings[i].value,
            settings[i].startDate,
            settings[i].description));
          break;
        default:
          console.log(settings[i]);
      }
    }

  }
  return (
    <div>

    </div>
  );
}

export default Settings;

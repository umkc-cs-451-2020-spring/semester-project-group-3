import React from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, red } from '@material-ui/core/colors';
import CheckBox from "./CheckBox.js";
import TextField from "./TextField.js";
import VerticalCenter from "./VerticalCenter.js";
import updateNotificationSetting from "./notificationSettingsUpdateAction.js";
import { useSelector, useDispatch } from "react-redux";


// Check box component going here. will be moved.
const FlexLabel = styled.label`
  display: flex;
  `

// Styling for Edit Notif
const Content = styled.div`
  background: white;
  border-radius: 25px;
  position: relative;
  display: grid;
  grid-template-columns: 45% 25% 30%;
  grid-template-rows: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 90%;
  width: 60%;
  overflow: hidden;
  outline: none;
  margin-left: 120px;

`

const Specifics = styled.div`
  font-Size: 20px;
  overflow: hidden;
  height: 40px;
  padding-left: 15px;
`
const Active = styled.div`
  display: flex;
  padding-left: 7px;
`
const Delete = styled.div`
`
const Edit = styled.div`
`

const ActiveText = styled.div`
  margin-left: 6px;
  color: ${props => props.checked === true ? green[600] : red[400] };
`
const SaveButton = styled.button`
  margin-left: 5px;
  margin-right: 7px;
  margin-top: 5px;
  height: 25px;
  background: #74BD43;
  font-size: 14px;
  border-radius: 5px;
`
const ButtonGroup = styled.div`
  display: flex;
  text-align: left;
  padding-Left: 5px;
`

export default function UpdateNotif(props){
  const {
    type,
    idx,
    cancelFunction,
    row,
    amountValue,
    activeValue,
    update,
    reRenderSettings  } = props;
  const dispatch = useDispatch();

  // types of text fields depending on what type of notification there is.
  const [amount, setAmount] = React.useState(amountValue.slice(1));
  const [active, setActive] = React.useState(activeValue);

  const handleAmountChange = (e)=>{
    console.log("EditAmountChange", e.target.value);
    var tempAmount = e.target.value;
    setAmount(tempAmount)
    console.log(tempAmount);

  }
  const handleActiveChange = (e)=>{
    console.log("EditActiveChange", e.target.checked);
    var tempActive = e.target.checked;
    setActive(tempActive)
    console.log(tempActive);
  }

  const handleSave = ()=>{
    console.log("Saving");
    let tempAmount;
    let tempValue;
    let tempActive;

    if (type==="descriptionContains"){
      tempAmount=null;
      tempValue=amount;
    }else{
      tempAmount=amount;
      tempValue=null;
    }
    if (active){
      tempActive = 1;
    }else{
      tempActive = 0;
    }
    const rowToSend = [{
      "active": tempActive,
      "amount": tempAmount,
      "associatedAccount": row.associatedAccount,
      "notificationTriggerID": row.notificationTriggerID,
      "startDate": row.startDate,
      "type": row.type,
      "value": tempValue
    }];
    console.log(rowToSend);
    UpdateSetting(rowToSend);

  }
  async function UpdateSetting(rowToSend) {

    await dispatch(updateNotificationSetting(rowToSend));
    await delay(500);
    await reRenderSettings();
  }
  const delay = ms => new Promise(res => setTimeout(res, ms));


  let typeTextField;
  switch (type) {
    case "transactionAmountAbove":
      typeTextField= (
        <TextField
          key={`${type}-Value-${idx}`}
          id={`${type}-Value-${idx}`}
          value={amount}
          onChange={(e)=> handleAmountChange(e)}
          title = {"Amount"}
          />
        );
      break;
    case "balanceBelow":
      typeTextField= (
        <TextField
          key={`${type}-Value-${idx}`}
          id={`${type}-Value-${idx}`}
          value={amount}
          onChange={(e)=> handleAmountChange(e)}
          title = {"Amount"}
          />
        );
      break;
    case "descriptionContains":
      typeTextField= (
        <TextField
          key={`${type}-Value-${idx}`}
          id={`${type}-Value-${idx}`}
          value={amount}
          onChange={(e)=> handleAmountChange(e)}
          title = {"Description Matching"}
          />
        );
      break;
    default:
      console.log("theres an errors");
  }

  // handles checkbox slider text.
  let activeText;
  if (activeValue){
    activeText="Active";
  }else{
    activeText="Not Active";
  }

  return(
    <Content key={`${type}-${idx}`}>
      <Specifics>
        <VerticalCenter itemToCenter={typeTextField}/>
      </Specifics>
      <Active>
        <VerticalCenter itemToCenter={
          <FlexLabel>
            <CheckBox checked={active} update={update} onChange={(e) =>handleActiveChange(e)} />
            <ActiveText checked={active} >{activeText}</ActiveText>
          </FlexLabel>}
        />
      </Active>
      <ButtonGroup>
          <SaveButton onClick={() => handleSave()}>
            Save
          </SaveButton>

          <Delete>
            <CancelIcon onClick={() => cancelFunction(idx)}/>
          </Delete>

      </ButtonGroup>
    </Content>
  );
}

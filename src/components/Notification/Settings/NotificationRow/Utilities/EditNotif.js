import React from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, red } from '@material-ui/core/colors';
import CheckBox from "./CheckBox.js";
import TextField from "./TextField.js";
import VerticalCenter from "./VerticalCenter.js";


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
  grid-template-columns: auto 25% 8%;
  grid-template-rows: auto;
  margin-top: 5px;
  height: 100%;
  width: 57%;
  overflow: hidden;
  outline: none;
  margin-left: 20px;

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

export default function EditNotif(props){
  const {
    type,
    deleteFunction,
    idx,
    onAmountChange,
    amountValue,
    activeValue,
    onActiveChange,
    update } = props;

  // types of text fields depending on what type of notification there is.

  let typeTextField;
  switch (type) {
    case "transactionAmountAbove":
      typeTextField= (
        <TextField
          key={`${type}-Value-${idx}`}
          id={`${type}-Value-${idx}`}
          value={amountValue}
          onChange={(e)=> onAmountChange(e,idx)}
          title = {"Amount"}
          />
        );
      break;
    case "balanceBelow":
      typeTextField= (
        <TextField
          key={`${type}-Value-${idx}`}
          id={`${type}-Value-${idx}`}
          value={amountValue}
          onChange={(e)=> onAmountChange(e,idx)}
          title = {"Amount"}
          />
        );
      break;
    case "descriptionContains":
      typeTextField= (
        <TextField
          key={`${type}-Value-${idx}`}
          id={`${type}-Value-${idx}`}
          value={amountValue}
          onChange={(e)=> onAmountChange(e,idx)}
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
            <CheckBox checked={activeValue} update={update} onChange={(e) =>onActiveChange(e,idx)} />
            <ActiveText checked={activeValue} >{activeText}</ActiveText>
          </FlexLabel>}
        />
      </Active>
      <Delete>
        <VerticalCenter itemToCenter={<CancelIcon onClick={() => deleteFunction(idx)}/>}/>
      </Delete>
    </Content>
  );
}

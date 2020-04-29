import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, red } from '@material-ui/core/colors';
import CancelIcon from '@material-ui/icons/Cancel';
import postNotificationSetting from "./notificationSettingsPostAction.js";
import { useSelector, useDispatch } from "react-redux";
import deleteNotificationSetting from "./notificationSettingsDeleteAction.js";

const GreenCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AmountText = withStyles(theme => ({
  root: {
    width: '100px',
  },
}))(TextField);
const DescriptionCat = withStyles(theme => ({
  root: {
    width: '200px',
  },
}))(TextField);
const DescriptionText = withStyles(theme => ({
  root: {
    width: '300px',
  },
}))(TextField);

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  /* border: 1px solid blue; */
  position: relative;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40px auto 35px;
`
const Title = styled.div `
  font-size: 24px;
  width: 80%;
  border-bottom: 1px solid black;
  text-align: left;
  padding-left: 20px;
`


const Content = styled.div`
  border: 1px solid blue;
  position: relative;
  display: grid;
  grid-template-columns: auto 15% 8%;
  grid-template-rows: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  height: fit-content;
  width: 100%;
  overflow: hidden;
  outline: none;
`

const Specifics = styled.div`
  border: 1px solid red;
  font-Size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  vertical-align: middle;
  height: fit-content;
`
const Active = styled.div`
  border: 1px solid black;
  display: flex;
`
const Delete = styled.div`
  border: 1px solid green;
`
const Edit = styled.div`
  border: 1px solid green;
`
const ButtonGroup = styled.div`
  padding-top: 7px;
  text-align: left;
  padding-Left: 25px;
`
const ActiveText = styled.div`
  color: ${props => props.checked === true ? green[600] : red[400] };
`


// empty component
const Empty = styled.div`
  height: 100%;
  width: 100%;
  text-align: left;
  padding-Left: 25px;
  padding-Top: 2px;
  display: ${props => props.isHidden === false ? "block" : "none"};
`

// 4 columns
function SettingsRow(props){
  const {rowData, deleteFunction} = props;
  console.log(rowData);
  return(
    <Wrapper2>
      <Header>
        <HeadCell>Description</HeadCell>
        <HeadCell>Date Added</HeadCell>
        <HeadCell>Value</HeadCell>
        <HeadCell>Status</HeadCell>
      </Header>
      {rowData.map((row,index) => {
        console.log("inside row mapping: ", row);
        var value ="";
        if (row.type==="descriptionContains"){
           value= row.value;
        }else{
          value= row.amount;
        }
        return(
          <BodyArea index={index}>
            <BodyCell>{row.description}</BodyCell>
            <BodyCell>{row.startDate}</BodyCell>
            <BodyCell>{value}</BodyCell>
            <BodyCell>{row.active}</BodyCell>
            <BodyCell><CancelIcon onClick={() => deleteFunction(index)}/></BodyCell>
          </BodyArea>
        );
      })}

    </Wrapper2>

  );
}
const Wrapper2 = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30px auto;
  padding-left: 20px;
  overflow: hidden;
  outline: none;

`
const Header = styled.div `
  font-size: 18px;
  width: 100%;
  border-bottom: 2px solid grey;
  display: grid;
  grid-template-columns: 30% 25% 15% 30%;;
  grid-template-rows: auto;
  font-weight: bold;
  text-align: left;
`
const HeadCell = styled.div `
  width: 100%;
`

const BodyArea = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 30% 25% 15% 20% 10%;
  grid-template-rows: auto;
  text-align: left;
`
const BodyCell = styled.div `
  border-right: 1px solid black;
  font-size: 16px;
  margin:4px;
  width: 100%;
`

function EmptyNotif(props){
  const { isHidden } = props;
  console.log(isHidden);
  return (
    <Empty isHidden={isHidden}>No Notifications Set up yet. Press Add to add one.</Empty>
  );
}


// data component.
function Notif(){

  return(
    <Content>
      <Specifics></Specifics>
      <Active></Active>
      <Edit></Edit>
    </Content>
  );
}

function EditNotif(props){
  const {
    type,
    deleteFunction,
    idx,
    onAmountChange,
    amountValue,
    activeValue,
    onActiveChange,
    onDescriptionChange,
    descriptionValue } = props;

  // types of text fields depending on what type of notification there is.
  let title;
  let typeTextField;
  switch (type) {
    case "transactionAmountAbove":
      title = "Amount";
      typeTextField= (
        <AmountText
          id={`${type}-Value-${idx}`}
          label="Notif Value"
          variant="outlined"
          value={amountValue}
          onChange={(e)=> onAmountChange(e,idx)}
          size="small"/>
        );
      break;
    case "balanceBelow":
      title = "Amount";
      typeTextField= (
        <AmountText
          id={`${type}-Value-${idx}`}
          label="Notif Value"
          variant="outlined"
          value={amountValue}
          onChange={(e)=> onAmountChange(e,idx)}
          size="small"/>
        );
      break;
    case "descriptionContains":
      title = "Description Matching";
      typeTextField= (
        <DescriptionCat
          id={`${type}-Value-${idx}`}
          label="Notif Value"
          variant="outlined"
          value={amountValue}
          onChange={(e)=> onAmountChange(e,idx)}
          size="small"/>
        );
      break;
    case "recurringDescription":
      title = "Recurring Alert";
      typeTextField= (
        <div>No Text needed</div>
        );
      break;
    default:
      title = "Errrors are present";
  }
  // handles checkbox slider text.
  let activeText;
  if (activeValue){
    activeText="Active";
  }else{
    activeText="Not Active";
  }
  const dText= "Description"
  const finePrint="This does not have any effect on setting. Is here for your own personal use."

  return(
    <Content key={`${type}-${idx}`}>
      <Specifics>
        {title}
        {typeTextField}
        {dText}
        <DescriptionText
          id={`${type}-Description-${idx}`}
          label="Descriptive Message"
          variant="outlined"
          value={descriptionValue}
          onChange={(e)=> onDescriptionChange(e,idx)}
          size="small"
        />
      </Specifics>
      <Active>
        <ActiveText checked={activeValue}>{activeText}</ActiveText>
        <GreenCheckbox checked={activeValue} onChange={(e)=>onActiveChange(e,idx)} />
      </Active>
      <Delete>
        <CancelIcon onClick={() => deleteFunction(idx)}/>
      </Delete>
    </Content>
  );
}


// main component
// Todo Save button will set numEditNotifs to back to zero
// Todo Add a condition to render the permanent notifs that will be read from
// data base
function NotificationRow(props){
  const {rows, type,reRenderSettings} = props;
  var present ="";
  if (rows && rows.length>0 ){
    present = true;
  }else {
    present = false;
  }
  const [numEditNotifs, setNumEditNotifs] = React.useState([]);
  const [notifPresent, setNotifPresent] = React.useState(present);
  const dispatch = useDispatch();
  const acctID = useSelector((state) => state.loginReducer.accountID);
  const post_loading = useSelector((state) => state.notificationSettingsReducer.post_loading);
  const delete_loading = useSelector((state) => state.notificationSettingsReducer.delete_loading);



  const handleAddNumNotifs = () => {
    setNotifPresent(true);
    const values = [...numEditNotifs];
    values.push({ amount: "", active: true, description:"" });
    setNumEditNotifs(values);
    console.log(numEditNotifs);
  };
  // Edit notif change Functions below
  const handleAmountChange = (e, index)=>{
    console.log("amountChange", e.target.value);
    var tempEditList = [...numEditNotifs];
    tempEditList[index].amount = e.target.value;
    setNumEditNotifs(tempEditList)
    console.log(numEditNotifs);
  }
  const handleActiveChange = (e, index)=>{
    console.log("active change",e.target.checked);
    var tempEditList = [...numEditNotifs];
    tempEditList[index].active = e.target.checked;
    setNumEditNotifs(tempEditList)
    console.log(numEditNotifs);
  }
  const handleDescriptionChange = (e, index)=>{
    console.log("Description change",e.target.value);
    var tempEditList = [...numEditNotifs];
    tempEditList[index].description = e.target.value;
    setNumEditNotifs(tempEditList)
    console.log(numEditNotifs);
  }
  const handleDeleteNumNotifs = idx => {
    const values = [...numEditNotifs];
    values.splice(idx, 1);
    setNumEditNotifs(values);

    if (numEditNotifs.length === 1 && rows.length===0){
      // Todo to check if there is any if the database
      setNotifPresent(false);
    }

  };

  async function postSettings(paramsArray) {
    let amount;
    let value;
    if (type==="descriptionContains"){
      amount=null;
      value=paramsArray.amount;
    }else{
      value=null;
      amount=paramsArray.amount;
    }
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
    console.log("account=" , acctID ,"&type=" ,
          type,  "&amount=" , amount ,"&value=", value,"&startDate="
          ,date ,"&description=" , paramsArray.description);
    await dispatch(postNotificationSetting(acctID, type, amount,value,date,paramsArray.description));
  }
  function postSettingsTest(array,idx){
    console.log("postSettingsTest: idx=", idx, "array=", array);
    postSettings(numEditNotifs[idx]).then(idx<numEditNotifs.length && postSettingsTest(array,(idx+1)));
  }
  const handleSaveNumNotifs = () => {
    var idx =0;
    postSettingsTest(numEditNotifs,0);
    // numEditNotifs.map((edit)=> {
    //   console.log("handleSave: ", edit);
    //   postSettings(edit);
    // })
    // postSettings(numEditNotifs[0]);
    setNumEditNotifs([]);
    setNotifPresent(true);
    // reRenderSettings();
    // post goes here

  };
  async function deleteSetting(triggerId) {
    await dispatch(deleteNotificationSetting(triggerId));
  }
  const deleteFromDb=(idx)=>{
    const triggerId = rows[idx].notificationTriggerID
    console.log("deleteFromDb:  ", triggerId);
    deleteSetting(triggerId).then(reRenderSettings());
  }
  // todo add function to handle deleting of settings
  // ********************
      // Start here

      // outer will deal with delete and update.
      // need to pass in the delete and update functions.

      // Do that next
      // the update will use the edit notif    which might get rearranged.
  // ********************

  // this needs alot of work
  // ****************************  will use part below
  // Notif Render component.
  // Need to put numEditNotifs into own component so it updates on return not before it.
  let notifData;

  if (!notifPresent){
    notifData = <EmptyNotif isHidden={notifPresent}/>;
  }
  else {
    if (rows && rows.length > 0){
      notifData = <SettingsRow rowData={rows} deleteFunction={deleteFromDb}/>;
    }
  }
  let title;
  switch (type) {
    case "transactionAmountAbove":
      title="Transaction Exceeds Triggers";
      break;
    case "balanceBelow":
      title="Balance Below Certian Amount Triggers";
      break;
    case "descriptionContains":
      title="Description Contains Triggers";
      break;
    case "recurringDescription":
      title="Recurring Transaction Triggers";
      break;
    default:
      title = "Something went wrong. "

  }

  if (post_loading || delete_loading){
    return(<div> Loading....</div>);
  }
  return (
    <Wrapper>
      <Title>
        {title}
      </Title>
      <div>
        {notifData}
        {numEditNotifs.map((edits,idx) =>{
          return(
          <EditNotif
            idx={idx}
            type={type}
            deleteFunction={handleDeleteNumNotifs}
            onAmountChange={handleAmountChange}
            amountValue={edits.amount}
            activeValue={edits.active}
            descriptionValue={edits.description}
            onAmountChange={handleAmountChange}
            onActiveChange={handleActiveChange}
            onDescriptionChange={handleDescriptionChange}

          />);
        })}
      </div>
      <ButtonGroup>
        <button onClick={() => handleAddNumNotifs()}>ADD</button>
        <button onClick={() => handleSaveNumNotifs()}>SAVE</button>
      </ButtonGroup>
    </Wrapper>
  );
}

export default NotificationRow;

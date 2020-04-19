import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, red } from '@material-ui/core/colors';
import CancelIcon from '@material-ui/icons/Cancel';
// import postNotificationSetting from "./notificationSettingsPostAction.js";
import { useSelector, useDispatch } from "react-redux";

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
const DescriptionText = withStyles(theme => ({
  root: {
    width: '200px',
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
  grid-template-columns: 60%  30% 10%;
  grid-template-rows: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
`

const Specifics = styled.div`
  border: 1px solid red;
  font-Size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  Height: 40px;
  vertical-align: middle;
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
  const {rowData} = props;
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
        if (row.type==="descriptionMatch"){
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
          </BodyArea>
        );
      })}

    </Wrapper2>

  );
}
const Wrapper2 = styled.div`
  height: 100%;
  width: 100%;
  position: block;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30px auto;
  padding-left: 20px;

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
  grid-template-columns: 30% 25% 15% 30%;
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
  const { type, deleteFunction, idx } = props;
  const [notifValue, setNotifValue] = React.useState('');
  const [notifActive, setNotifActive] = React.useState(true);

  const handleNotifValue = event => {
    setNotifValue(event.target.value);
  };
  const handleNotifActive = event => {
    setNotifActive(event.target.checked);
  };
  // types of text fields depending on what type of notification there is.
  let title;
  let typeTextField;
  switch (type) {
    case "Transaction":
      title = "Amount";
      typeTextField= (
        <AmountText
          id={`${type}-Value-${idx}`}
          label="Notif Value"
          variant="outlined"
          value={notifValue}
          onChange={handleNotifValue}
          size="small"/>
        );
      break;
    case "Balance":
      title = "Amount";
      typeTextField= (
        <AmountText
          id={`${type}-Value-${idx}`}
          label="Notif Value"
          variant="outlined"
          value={notifValue}
          onChange={handleNotifValue}
          size="small"/>
        );
      break;
    case "Description":
      title = "Description";
      typeTextField= (
        <DescriptionText
          id={`${type}-Value-${idx}`}
          label="Notif Value"
          variant="outlined"
          value={notifValue}
          onChange={handleNotifValue}
          size="small"/>
        );
      break;
    case "Recurring Alert":
      title = "Recurring Alert";
      typeTextField= (
        <div>No Text needed</div>
        );
      break;
    default:
      title = "Errrors are present";
  }
  let activeText;
  if (notifActive){
    activeText="Active";
  }else{
    activeText="Not Active";
  }


  return(
    <Content key={`${type}-${idx}`}>
      <Specifics>
        {title}
        {typeTextField}
      </Specifics>
      <Active>
        <ActiveText checked={notifActive}>{activeText}</ActiveText>
        <GreenCheckbox checked={notifActive} onChange={handleNotifActive} />
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
  const {rows} = props;
  var present ="";
  if (rows.length>0 ){
    present = true;
  }else {
    present = false;
  }
  const [numEditNotifs, setNumEditNotifs] = React.useState([]);
  const [showEdit, setShowEdit] = React.useState(false);
  const [notifPresent, setNotifPresent] = React.useState(present);
  const dispatch = useDispatch();
  const acctID = useSelector((state) => state.loginReducer.accountID);



  // todo add  dispatch here.
  const handleAddNumNotifs = () => {
    setNotifPresent(true);
    const values = [...numEditNotifs];
    values.push({ value: null });
    setNumEditNotifs(values);

  };

  const handleDeleteNumNotifs = idx => {
    const values = [...numEditNotifs];
    values.splice(idx, 1);
    setNumEditNotifs(values);

    if (numEditNotifs.length === 1 && rows.length === 0){
      // Todo to check if there is any if the database
      setNotifPresent(false);
      console.log("inside handleDelete: " , rows.length, notifPresent);

    }

  };
  const handleSaveNumNotifs = () => {
    setNotifPresent(true);

    // post goes here

  };
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
    if (rows.length > 0){
      notifData = <SettingsRow rowData={rows}/>;
    }
  }
  return (
    <Wrapper>
      <Title>
        {props.type}
      </Title>
      <div>
        {notifData}
        {numEditNotifs.map((edits,idx) =>{
          return(
          <EditNotif
            idx={idx}
            type={props.type}
            deleteFunction={handleDeleteNumNotifs}
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

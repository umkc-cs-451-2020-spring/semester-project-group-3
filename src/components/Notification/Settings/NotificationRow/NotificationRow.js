import React from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditNotif from "./Utilities/EditNotif.js";
import PopUp from "./Utilities/PopUp.js";
import postNotificationSetting from "./notificationSettingsPostAction.js";
import { useSelector, useDispatch } from "react-redux";
import deleteNotificationSetting from "./notificationSettingsDeleteAction.js";


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
  font-size: 20px;
  width: 80%;
  border-bottom: 2px solid grey;
  display: grid;
  grid-template-columns: 30% 20% auto;
  grid-template-rows: auto;
  font-weight: bold;
  padding-left: 4px;
  text-align: left;
  background: #339966;
  color: #ffffff;
  border-radius: 10px     10px      0           0;
`
const HeadCell = styled.div `
  width: 100%;
`

const BodyArea = styled.div`
  position: relative;
  padding-left: 4px;
  width: 80%;
  display: grid;
  grid-template-columns: 30% 20% auto ;
  grid-template-rows: auto;
  text-align: left;
  background: ${props => (props.index%2===0 ? 'white' : 'rgb(220,220,220,.9)')};
  border-radius: ${props => (props.index === props.cornerRounding -1 ?  "0 0 10px 10px" : null )};
`
const BodyCell = styled.div `
  font-size: 16px;
  margin:4px;
  width: 100%;
`
const BodyCellSpeacial = styled.div `
  font-size: 16px;
  margin:4px;
  width: 100%;
  display: grid;
  grid-template-columns: 85% 15% ;
  grid-template-rows: auto;
`
const ActiveTextStyle = styled.div`
  color: ${props => (props.active ? "#74BD43" : "#ff0000")}
`
// 3 columns
function SettingsRow(props){
  const {rowData, popup} = props;
  var rowDataLength = rowData.length;
  console.log(rowData);
  return(
    <Wrapper2>
      <Header>
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
          value="$"+ row.amount;
        }
        var activeText = "";
        if (row.active === 1){
          activeText = "Active";
        }else {
          activeText = "Not Active";
        }
        return(
          <BodyArea key={index} index={index} cornerRounding={rowDataLength}>
            <BodyCell>{row.startDate}</BodyCell>
            <BodyCell>{value}</BodyCell>
            <BodyCellSpeacial>
              <ActiveTextStyle active={row.active}>
                {activeText}
              </ActiveTextStyle>
              <DeleteForeverOutlinedIcon onClick={() => popup(index)}/>
            </BodyCellSpeacial>

          </BodyArea>
        );
      })}

    </Wrapper2>

  );
}

// empty component
const Empty = styled.div`
  height: 100%;
  width: 100%;
  text-align: left;
  padding-Left: 25px;
  padding-Top: 2px;
  display: ${props => props.isHidden === false ? "block" : "none"};
`
function EmptyNotif(props){
  const { isHidden } = props;
  console.log(isHidden);
  return (
    <Empty isHidden={isHidden}>No Notifications Set up yet. Press Add to add one.</Empty>
  );
}


// main component
// Todo Save button will set numEditNotifs to back to zero
// Todo Add a condition to render the permanent notifs that will be read from
// data base
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40px auto 35px;
`
const Title = styled.div `
  font-weight: bold;
  font-size: 24px;
  width: 80%;
  text-align: left;
  padding-left: 20px;
  color: #ffffff;
`
const ButtonGroup = styled.div`
  padding-top: 7px;
  text-align: left;
  padding-Left: 25px;
`
const AddButton = styled.button`
  height: 25px ;
  font-size: 14px;
  border-radius: 5px;

`
const SaveButton = styled.button`
  margin-left: 5px;
  height: 25px;
  background: #74BD43;
  font-size: 14px;
  border-radius: 5px;


`
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
  const [showPopup, setShowPopup] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState(0);
  const dispatch = useDispatch();
  const acctID = useSelector((state) => state.loginReducer.accountID);
  const post_loading = useSelector((state) => state.notificationSettingsReducer.post_loading);
  const delete_loading = useSelector((state) => state.notificationSettingsReducer.delete_loading);

  const togglePopup = (idx) => {
    setShowPopup(!showPopup);

    if (idx){
      setDeleteIndex(idx);
    }
    console.log("togglePopup: " + showPopup + "idx:" + deleteIndex);
  }


  const handleAddNumNotifs = () => {
    setNotifPresent(true);
    const values = [...numEditNotifs];
    values.push({ amount: "", active: true , update: false});
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
    console.log("active change", e.target.checked);
    var tempEditList = [...numEditNotifs];
    tempEditList[index].active = e.target.checked;
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
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
    var triggers=[];

    for (var i = 0; i < paramsArray.length; i++){
      if (type==="descriptionContains"){
        amount=null;
        value=paramsArray[i].amount;
      }else{
        value=null;
        amount=paramsArray[i].amount;
      }
      triggers.push({"account": acctID, "type": type, "amount": amount, "value":value,"startDate": date});
      console.log("triggers: " + triggers);
    }
    await dispatch(postNotificationSetting(triggers));
    await delay(500);
    await reRenderSettings();
  }
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleSaveNumNotifs = () => {
    var idx =0;
    postSettings(numEditNotifs);
    setNumEditNotifs([]);
    setNotifPresent(true);
  };

  const deleteSetting = async (triggerId) => {
    await dispatch(deleteNotificationSetting(triggerId));
    await delay(600);
    await reRenderSettings();
  };
  // async function deleteSetting(triggerId) {
  //   await dispatch(deleteNotificationSetting(triggerId));
  // }
  const deleteFromDb=(idx)=>{
    togglePopup();
    const triggerId = rows[idx].notificationTriggerID
    console.log("deleteFromDb:  ", triggerId);
    deleteSetting(triggerId);
  }

      // outer will deal with delete and update.
      // need to pass in the delete and update functions.


      // need to style the input boxes to look better.
      // remove the borders
      // do the update portion

      // add popup making sure want to delete
      // change the incon on the delete from database to trashcan

      // figure out what is up with post.

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
      notifData = <SettingsRow rowData={rows} popup={togglePopup} />;
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
    default:
      title = "Something went wrong. "

  }

  if (post_loading || delete_loading){
    return <div><img src="/loading-spinner.svg" alt ="Loading" /></div>;
  }
  return (
    <Wrapper>
      <Title>
        {showPopup ? <PopUp cancel={togglePopup} deleteFunction={deleteFromDb} index={deleteIndex}/>:null}
        {title}
      </Title>
      <div>
        {notifData}
        {numEditNotifs.map((edits,idx) =>{
          return(
          <EditNotif
            key={`${type}-Value-${idx}`}
            idx={idx}
            type={type}
            deleteFunction={handleDeleteNumNotifs}
            onAmountChange={handleAmountChange}
            amountValue={edits.amount}
            activeValue={edits.active}
            onAmountChange={handleAmountChange}
            onActiveChange={handleActiveChange}
            update={edits.update}
          />);
        })}
      </div>
      <ButtonGroup>
        <AddButton onClick={() => handleAddNumNotifs()}>Add New Trigger</AddButton>
        <SaveButton onClick={() => handleSaveNumNotifs()}>Save Trigger</SaveButton>
      </ButtonGroup>
    </Wrapper>
  );
}

export default NotificationRow;

import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, red } from '@material-ui/core/colors';
import CancelIcon from '@material-ui/icons/Cancel';

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
function EmptyNotif(props){
  const { isHidden } = props;
  console.log(isHidden);
  return (
    <Empty isHidden={isHidden}>No Notifications Set up yet. Press Add to add one.</Empty>
  );
}

// notif create functions
// function createData(transId, pDate, balance, chargeType, amount, description) {
//   return {transId, pDate, amount, chargeType, balance, description};
// }
// function createBlankNotif(notif, type){
//     switch (type) {
//       case "Transaction":
//         createTNofis()
//         break;
//       case "Balance":
//         createBNofis()
//         break;
//       case "Description":
//         createDNofis()
//         break;
//       case "Recurring Alert":
//         createRNofis()
//         break;
//       default:
//
//     }
//
//   var tempRows= [];
//   if (transaction){
//     for (var i = 0; i< transaction.length; i++){
//       // todo add formating to date data.
//       tempRows.push(createData(
//         transaction[i].transactionID,
//         transaction[i].processingDate,
//         transaction[i].historicBalance,
//         transaction[i].type,
//         transaction[i].amount,
//         transaction[i].description
//       ));
//     }
//   }
//   return tempRows;
// }

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
  const [numEditNotifs, setNumEditNotifs] = React.useState([]);
  const [showEdit, setShowEdit] = React.useState(false);
  const [notifPresent, setNotifPresent] = React.useState(false);

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

    if (numEditNotifs.length === 0){
      // Todo to check if there is any if the database
      setNotifPresent(false);
    }

  };
  const handleSaveNumNotifs = () => {
    setNotifPresent(true);



  };

  // ****************************  will use part below
  // Notif Render component.
  // Need to put numEditNotifs into own component so it updates on return not before it.
  let notifData;
  if (!notifPresent){
    notifData = <EmptyNotif isHidden={notifPresent}/>;
    // notifData = <div>This will render data from database</div>
  }
  // else {
  //   notifData = <EmptyNotif isHidden={notifPresent}/>;
  // }
  // {notifData}

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

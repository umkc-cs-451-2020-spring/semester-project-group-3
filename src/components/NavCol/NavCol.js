import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { renderDashboard, renderTransaction, renderNotification, renderLogin } from "../../rStore/actions/index";

const Column = styled.div `
  grid-area: NavCol;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  border: 1px solid blue;
  position: relative;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 10% 10%;
`

// this is in 3 seperate components becuase if it was one all 3 would change color.
// might need refactor to make this looks prettier.
// todo add Css onhover to these components
const Tab1 = styled.div`
  text-align: Center;
  border: 2px solid black;
  align-self: stretch;
  background: ${props => props.page === "Dashboard" ? "#80ff80": "#ffffff"};
`
const Tab2 = styled.div`
  text-align: Center;
  border: 2px solid black;
  align-self: stretch;
  background: ${props => props.page === "Transaction" ? "#80ff80": "#ffffff"};
`
const Tab3 = styled.div`
  text-align: Center;
  border: 2px solid black;
  align-self: stretch;
  background: ${props => props.page === "Notification" ? "#80ff80": "#ffffff"};
`
const Tab4 = styled.div`
  text-align: Center;
  border: 2px solid black;
  align-self: stretch;
  background: ${props => props.page === "Login" ? "#80ff80": "#ffffff"};
`

function NavCol(){
  // this is how you access the redux store
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.currentTab );
  return(
    <Column>
      <Tab1 onClick={() => dispatch(renderDashboard())} page={currentTab}>
        Dashboard
      </Tab1>
      <Tab2 onClick={() => dispatch(renderTransaction())} page={currentTab}>
        Transactions
      </Tab2>
      <Tab3 onClick={() => dispatch(renderNotification())} page={currentTab}>
        Notification
        <br/>
        Settings
      </Tab3>
      <Tab4 onClick={() => dispatch(renderLogin())} page={currentTab}>
        Login
      </Tab4>
    </Column>
  );
}

export default NavCol;

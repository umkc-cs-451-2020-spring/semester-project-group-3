import React from 'react';
import styled from 'styled-components';
import NotificationRow from '../NotificationRow'
const Outer = styled.div`
  width: 100%;
`
const Title = styled.div`
  width: 100%;
  font-size: 28px;
  text-align: left;
  border-bottom: 1px solid grey;
`
const Description = styled.div`
  width: 100%;
  font-size: 16px;
`



// balance Transactions description recurring

function Notification(){

  return (
  <Outer>
    <Title>Notification Settings
      <Description>Add Notifications below by Category.</Description>
    </Title>
    <NotificationRow type="Transaction"></NotificationRow>
    <NotificationRow type="Balance"></NotificationRow>
    <NotificationRow type="Description"></NotificationRow>
    <NotificationRow type="Recurring Alert"></NotificationRow>


  </Outer>

  );
}

export default Notification;

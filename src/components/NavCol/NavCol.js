import React from 'react';
import styled from 'styled-components';


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
const Tab = styled.div`
  text-align: Center;
  border: 2px solid black;
  align-self: stretch;

`
export default () => (
    <Column>
      <Tab>
        Dashboard
      </Tab>
      <Tab>
        Transactions
      </Tab>
      <Tab>
        Notification
        <br/>
        Settings
      </Tab>
    </Column>
)

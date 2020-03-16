import React from 'react';
import styled from 'styled-components';
import Table from '../Table';
import fetchTransactions from "./transactionAction.js";
import { useSelector, useDispatch } from 'react-redux';


function Dashboard(){
  var username = "connor";
  var loggedIn = "true";
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error );
  const loading = useSelector((state) => state.loading );
  const transactions = useSelector((state) => state.transactions );
  dispatch(fetchTransactions());



  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      // Todo Render Notification triggers here
      <Table>
      </Table>
    </div>
  );
}

export default Dashboard;

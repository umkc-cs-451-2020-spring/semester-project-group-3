import React from 'react';
import styled from 'styled-components';
import Table from '../Table';
import fetchTransactions from "./transactionAction.js";
import { useSelector, useDispatch } from 'react-redux';


function Dashboard(){
  var username = "connor";
  var loggedIn = "true";
  const dispatch = useDispatch();
  const acctID = useSelector((state) => state.loginReducer.accountID );

  function createData(transId, pDate, balance, chargeType, amount, description) {
    return {transId, pDate, amount, chargeType, balance, description};
  }
  function createRows(transaction){
    var tempRows= [];
    if (transaction){
      for (var i = 0; i< transaction.length; i++){
        // todo add formating to date data.
        tempRows.push(createData(
          transaction[i].transactionID,
          transaction[i].processingDate,
          transaction[i].historicBalance,
          transaction[i].type,
          transaction[i].amount,
          transaction[i].description
        ));
      }
    }
    return tempRows;
  }
  async function getTransactions(){
    await dispatch(fetchTransactions(acctID));
  }
  // this is called after the component is rendered. 
  React.useEffect(() => {
   getTransactions();
  }, []);

  const error = useSelector((state) => state.transactionsReducer.error );
  const loading = useSelector((state) => state.transactionsReducer.loading );
  const transactions = useSelector((state) => state.transactionsReducer.items );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error}</div>;
  }
  return (
    <div>
      // Todo Render Notification triggers here
      <Table rows={createRows(transactions)}>
      </Table>
    </div>
  );
}

export default Dashboard;

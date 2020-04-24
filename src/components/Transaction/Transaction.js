import React from 'react';
import fetchTransactions from "../Dashboard/transactionAction.js";
import { renderAddTransactionForm } from '../../rStore/actions/tabChangeActions';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'moment';
import Table from '../Table';

function Transaction(){
  const dispatch = useDispatch();
  const axios = require('axios');
  Moment.locale('en');
  const acctID = useSelector((state) => state.loginReducer.accountID );

  const handleAddTransaction = (event) => {
    dispatch(renderAddTransactionForm());
  }

  const handleClick = (event) => {
    axios.get('/export/' + acctID)
    .then(function(response) {
      window.alert(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  function createData(transId, pDate, balance, chargeType, amount, description) {
    return {transId, pDate, amount, chargeType, balance, description};
  }
  function createRows(transaction){
    var tempRows= [];
    if (transaction){
      for (var i = 0; i< transaction.length; i++){
        transaction[i].type === "DR" ? transaction[i].type = "Debit" : transaction[i].type = "Credit"

        tempRows.push(createData(
          transaction[i].transactionID,
          Moment(transaction[i].processingDate).format('MM/DD/YYYY'),
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
    return <div><img src="/loading-spinner.svg" alt ="Loading" /></div>;
  }
  if (error) {
    return <div>Error! {error}</div>;
  }
  return (
    <div>
      <Table rows={createRows(transactions)}>
      </Table>
      <br/>
      <button type="button"
              className="submit-btn"
              onClick={handleAddTransaction}>
        Add Transaction
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button"
              className="submit-btn"
              onClick={handleClick}> 
      Export to CSV
      </button>
    </div>
  );
}

export default Transaction;

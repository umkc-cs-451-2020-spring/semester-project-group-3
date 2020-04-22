import React from "react";
import Table from "../Table";
import Notifications from "../Notifications";
import fetchTransactions from "./transactionAction.js";
import fetchNotifications from "./notificationAction.js";
import Moment from 'moment';
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  Moment.locale('en');
  const acctID = useSelector((state) => state.loginReducer.accountID);

  function createData(
    transId,
    pDate,
    balance,
    chargeType,
    amount,
    description
  ) {
    return { transId, pDate, amount, chargeType, balance, description };
  }
  function createRows(transaction) {
    var tempRows = [];
    if (transaction) {
      for (var i = 0; i < transaction.length; i++) {
        transaction[i].type === "DR" ? transaction[i].type = "Debit" : transaction[i].type = "Credit"
        
        tempRows.push(
          createData(
            transaction[i].transactionID,
            Moment(transaction[i].processingDate).format('MM/DD/YYYY'),
            transaction[i].historicBalance,
            transaction[i].type,
            transaction[i].amount,
            transaction[i].description
          )
        );
      }
    }
    return tempRows;
  }

  async function getNotifications() {
    await dispatch(fetchNotifications(acctID));
  }
  // this is called after the component is rendered.
  React.useEffect(() => {
    getNotifications();
  }, []);

  async function getTransactions() {
    await dispatch(fetchTransactions(acctID));
  }
  // this is called after the component is rendered.
  React.useEffect(() => {
    getTransactions();
  }, []);

  const error = useSelector((state) => state.transactionsReducer.error);
  const loading = useSelector((state) => state.transactionsReducer.loading);
  const transactions = useSelector((state) => state.transactionsReducer.items);

  const notif_error = useSelector((state) =>
    console.log(state.notificationsReducer.notif_error)
  );
  const notif_loading = useSelector(
    (state) => state.notificationsReducer.notif_loading
  );
  const notifications = useSelector(
    (state) => state.notificationsReducer.notif_items
  );

  if (loading || notif_loading) {
    return <div><img src="/loading-spinner.svg" alt ="Loading" /></div>;
  }
  if (error) {
    return <div>Error while fetching transactions: {error}</div>;
  }
  if (notif_error) {
    return <div>Error while fetching notifications: {notif_error}</div>;
  }
  return (
    <div>
      <Notifications notifications={notifications} />
      <Table rows={createRows(transactions)}></Table>
    </div>
  );
}

export default Dashboard;

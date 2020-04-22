import React from 'react';
import '../styles/App.css';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import Transaction from '../components/Transaction';
import Notification from '../components/Notification';
import AddTransaction from '../components/AddTransaction/AddTransactionForm';
import { useSelector } from 'react-redux';


function App() {
// TODO logic for render component AKA Dashboard, Notification, Transaction
// will live here. depending on what the state of our redux store we will
// render a different component
  const currentTab = useSelector((state) => state.tabChangeReducer.currentTab );
  let currentPage;
  if (currentTab === "Dashboard") {
    currentPage = <Dashboard/>;
  }else if (currentTab === "Transaction") {
    currentPage = <Transaction/>;
  }else if (currentTab === "Notification") {
    currentPage = <Notification/>;
  } else if (currentTab === "Add Transaction") {
    currentPage = <AddTransaction/>
  }
  // todo add another else with a lodding symbol to display when async
  // calls are being made
  return (

    <div className="App">
      <Layout>
        {currentPage}
      </Layout>
    </div>
  );
}

export default App;

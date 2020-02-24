import React from 'react';
import '../styles/App.css';
import Layout from '../components/Layout';
import LoginPage from '../components/Login'

function App() {
// TODO logic for render component AKA Dashboard, Notification, Transaction
// will live here. depending on what the state of our redux store we will
// render a different component
  return (
    <div className="App">
      <Layout>
        <LoginPage />
      </Layout>
    </div>
  );
}

export default App;

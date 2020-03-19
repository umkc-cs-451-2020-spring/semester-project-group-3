import React from 'react';
import '../styles/App.css';
import LoginForm from '../components/Login'
import App from './App';
import { useSelector } from 'react-redux';
import authenticate from '../rStore/store/authenticate'

function LoginPage() {
  const currentPage = useSelector((state) => state.tabChangeReducer.currentPage );
  // console.log(currentPage);
  let displayPage;
  if (currentPage === "App") {
    displayPage = <App/>;
  }else if (currentPage === "Login") {
    displayPage = <LoginForm onSubmit={authenticate}/>;
  }
      return (
        <div className="App">
            {displayPage}
        </div>
      );
    }

    export default LoginPage;

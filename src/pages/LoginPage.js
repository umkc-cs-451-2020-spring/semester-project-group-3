import React from 'react';
import '../styles/App.css';
import LoginForm from '../components/Login'
import App from './App';
import { useSelector } from 'react-redux';

function LoginPage() {
  const currentPage = useSelector((state) => state.currentPage );
  let displayPage;
  if (currentPage === "App") {
    displayPage = <App/>;
  }else if (currentPage === "Login") {
    displayPage = <LoginForm/>;
  }
      return (
        <div className="App">
            {displayPage}
        </div>
      );
    }
    
    export default LoginPage;
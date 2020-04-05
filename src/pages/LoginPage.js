import React from 'react';
import '../styles/App.css';
import LoginForm from '../components/Login'
import App from './App';
import { SubmissionError } from 'redux-form'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginBegin, setCurrentUser, loginFailure } from '../rStore/actions/loginActions';
import { renderApp } from '../rStore/actions/tabChangeActions';

function LoginPage() {
  const axios = require('axios');
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.tabChangeReducer.currentPage );
  // console.log(currentPage);
  let displayPage;
  if (currentPage === "App") {
    displayPage = <App/>;
  }else if (currentPage === "Login") {
      displayPage = <LoginForm onSubmit={values=> {
        dispatch(loginBegin());
        axios.post('/login?email=' + values.email + '&password=' + values.password)
        .then(function(response) {
          dispatch(setCurrentUser(response.data.accountID));
          const loggedIn = response.data.isLoggedIn;
          if(loggedIn)
            {dispatch(renderApp());}
          else {
            dispatch(loginFailure("User not found"));
            window.alert('Incorrect email/password...');
            throw new SubmissionError({
              _error: 'Login failed!'
            });
          }
        })
        .catch(function(error) {
          dispatch(loginFailure(error))
          console.log(error);
        })
      }
    }/>;
  }
      return (
        <div className="App">
            {displayPage}
        </div>
      );
    }

    export default LoginPage;

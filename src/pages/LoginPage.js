import React from 'react';
import '../styles/App.css';
import LoginForm from '../components/Login'
import App from './App';
import { SubmissionError } from 'redux-form'

import { useDispatch, useSelector } from 'react-redux';
import authenticate from '../rStore/store/authenticate';
import fetchAccountID from '../components/Login/fetchAccountID';
import { loginBegin, setCurrentUser, loginFailure } from '../rStore/actions/loginActions';
import { renderApp } from '../rStore/actions/tabChangeActions';

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function LoginPage() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.tabChangeReducer.currentPage );
  // console.log(currentPage);
  let displayPage;
  if (currentPage === "App") {
    displayPage = <App/>;
  }else if (currentPage === "Login") {
      displayPage = <LoginForm onSubmit={values=> {
        dispatch(loginBegin());
        fetch("/login/", {method: "POST", body: values})
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          console.log(values);
          // should set current user acct id and logged in status
          dispatch(setCurrentUser(json));
          return json;
        })
        .catch(error => dispatch(loginFailure(error)));
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

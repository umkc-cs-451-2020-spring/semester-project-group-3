import React from 'react';
import '../styles/App.css';
import LoginForm from '../components/Login';
import SignUpForm from '../components/SignUp/SignUpForm';
import ForgotPass from '../components/ForgotPass/forgotPass';
import App from './App';
import { useDispatch, useSelector } from 'react-redux';
import login from '../components/Login/loginAction';
import signup from '../components/SignUp/signupAction';
import forgot from '../components/ForgotPass/forgotAction';

function LoginPage() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.tabChangeReducer.currentPage );
  const rememberMe = useSelector((state) => state.loginReducer.rememberMe)
  let displayPage;

  if (currentPage === "App") {
    displayPage = <App/>;
  }else if (currentPage === "SignUp") {
    displayPage = <SignUpForm onSubmit={values=> {
      dispatch(signup(values.accountID, values.email, values.password));
    }}/>;
  }else if (currentPage === "ForgotPass"){
    displayPage = <ForgotPass onSubmit={values=> {
      dispatch(forgot(values.email));
    }}/>
  }else if (currentPage === "Login") {
    displayPage = <LoginForm onSubmit={values=> {
      dispatch(login(values.email, values.password, rememberMe));
    }}/>;
  }
      return (
        <div className="App">
            {displayPage}
        </div>
      );
    }

    export default LoginPage;

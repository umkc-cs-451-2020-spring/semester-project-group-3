import { loginBegin, setCurrentUser, loginFailure } from '../../rStore/actions/loginActions';
import { renderApp } from '../../rStore/actions/tabChangeActions';
import { SubmissionError } from 'redux-form';

export default function login(email, password, rememberMe) {
    const axios = require('axios');
    return dispatch => {
        dispatch(loginBegin());
        axios.post('/login?email=' + email + '&password=' + password)
        .then(function(response) {
          dispatch(setCurrentUser(response.data.accountID));
          const loggedIn = response.data.isLoggedIn;
          if(loggedIn){
            localStorage.setItem('rememberMe', rememberMe);
            localStorage.setItem('user', rememberMe ? response.data.accountID : '');
            dispatch(renderApp());
          }else {
            dispatch(loginFailure("User not found"));
            window.alert('Incorrect email/password...');
            throw new SubmissionError({
              _error: 'Login failed!'
            });
          }})
        .catch(function(error) {
          dispatch(loginFailure(error))
          console.log(error);
        })
    }
}
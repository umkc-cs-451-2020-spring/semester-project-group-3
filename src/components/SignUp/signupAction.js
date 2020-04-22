import { renderApp } from '../../rStore/actions/tabChangeActions';
import { setCurrentUser } from '../../rStore/actions/loginActions';


export default function signup(accountID, email, password) {
    const axios = require('axios');
    return dispatch => {
        axios.post('/signup?email=' + email + '&password=' + password)
        .then(function(response) {
          window.alert("Account was successfully created! Your account ID is: " + response.data);
          dispatch(setCurrentUser(response.data));
          dispatch(renderApp());
          })
        .catch(function(error) {
          console.log(error);
        })
    }
}
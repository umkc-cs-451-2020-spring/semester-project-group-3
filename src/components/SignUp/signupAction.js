import { renderApp } from '../../rStore/actions/tabChangeActions';
import { setCurrentUser } from '../../rStore/actions/loginActions';


export default function signup(accountID, email, password) {
    const axios = require('axios');
    return dispatch => {
        axios.post('/signup?accountID=' + accountID + '&email=' + email +
        '&password=' + password)
        .then(function(response) {
          if (response.data === 'Success') {
            dispatch(setCurrentUser(accountID));
            dispatch(renderApp());
          }else {
            window.alert(response.data);
          }})
        .catch(function(error) {
          console.log(error);
        })
    }
}
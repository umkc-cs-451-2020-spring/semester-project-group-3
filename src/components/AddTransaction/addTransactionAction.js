import { renderTransaction } from '../../rStore/actions/tabChangeActions';

export default function addTransaction(accountID, type, amount, description) {
    const axios = require('axios');
    return dispatch => {
        axios.post('/addTransaction?accountID=' + accountID + '&type=' + type +
                    '&amount=' + amount + '&description=' + description)
        .then(function(response) { 
            window.alert(response.data);
            dispatch(renderTransaction());
        })
        .catch(function(error) {
            window.alert(error);
        })
    }
}
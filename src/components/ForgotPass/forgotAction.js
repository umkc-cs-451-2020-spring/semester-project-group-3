

export default function forgot(email) {
    const axios = require('axios');
    return dispatch => {
        axios.post('/mailer?email=' + email)
      .then(function(response) {
        window.alert(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
    }
}
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

function Transaction(){
  const axios = require('axios');
  const acctID = useSelector((state) => state.loginReducer.accountID );

  const handleClick = (event) => {
    axios.get('/export/' + acctID)
              .then(function(response) {
                window.alert(response.data);
              })
              .catch(function(error) {
                console.log(error);
              });
  }

  return (
    <div>
      <button type="button"
              onClick={handleClick}> 
      Export 
      </button>
    </div>
  );
}

export default Transaction;

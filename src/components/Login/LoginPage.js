import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm'

function LoginPage(){
    return (
      <div className="row"> 
        <div className="col-md-4 col-md-offset-4">
            <LoginForm />
        </div>
      </div>
    );
  }
  


  export default LoginPage;
import React from 'react';
import { Route } from 'react-router';
import App from './pages/App';
import LoginPage from './pages/LoginPage';
import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={LoginPage} />
  </Route>
)
import { SubmissionError } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux';
import { renderApp } from "../actions/tabChangeActions";


async function login(values) {
  // need to make this one if saying if fetchAcctID fails then throw these submission errors
  if (values.email !== 'test@gmail.com') {
    throw new SubmissionError({
      email: 'Incorrect email/password',
      _error: 'Login failed!'
    });
  }
  else if (values.password !== 'P@ssword1') {
    throw new SubmissionError({
      email: 'Incorrect email/password',
      _error: 'Login failed!'
    });
  }
  else {
    window.alert(`You submitted: \n\n${JSON.stringify(values, null, 2)}`);
  }
}

export default login
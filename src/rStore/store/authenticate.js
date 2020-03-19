import { SubmissionError } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux';
import { renderApp } from "../actions/tabChangeActions";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function authenticate(values) {
    return sleep(10).then(() => {
      if (values.email !== 'email@me.now') {
        throw new SubmissionError({
          username: 'User does not exist',
          _error: 'Login failed!'
        })
      } else if (values.password !== 'password') {
        throw new SubmissionError({
          password: 'Incorrect password',
          _error: 'Login failed!'
        })
      } else {
        window.alert(`You submitted: \n\n${JSON.stringify(values, null, 2)}`)
      }
     })
}

export default authenticate
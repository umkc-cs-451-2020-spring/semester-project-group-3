import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { renderSignUp } from '../../rStore/actions/tabChangeActions'
import validate from './validate';
import { useDispatch } from 'react-redux';

const renderTextField = (
    { input, label, meta: { touched, error }, ...custom },
  ) => (
    <TextField
      label={label}
      variant="filled"
      hintText={label}
      autoComplete='off'
      floatingLabelText={label}
      helperText={touched && error}
      {...input}
      {...custom}
      style={{
        backgroundColor: "white",
        width: "200px"
    }}
    InputProps={{
        style: {
            color: "black"
        }
    }}
    />
  );

const Login = props => {
    const { handleSubmit, pristine, submitting } = props
    const dispatch = useDispatch();
    return (
        <div className="login-page">
            <img className="logo-img" src="/logo.png" alt ="Logo" />
                <div className="App-header">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={{padding: "10px"}}>
                            <Field
                                name="email"
                                component= {renderTextField}
                                label="Email"
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                type="password"
                                component= {renderTextField}
                                label="Password"
                            />
                        </div>
                        <br/>
                        <div style={{padding: "10px"}}>
                            <button
                            type="submit"
                            className="submit-btn"
                            disabled={ pristine || submitting}
                            >
                                Submit
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button 
                            type="button" 
                            className="link-btn" 
                            onClick={() => dispatch(renderSignUp())}
                            > 
                            Sign Up 
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default reduxForm({
    form: 'Login',
    validate
})(Login)

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { renderLogin } from '../../rStore/actions/tabChangeActions';
import validate from './validate';
import { useDispatch } from 'react-redux';

function handleClick(e) {
    e.preventDefault();
  }

const renderTextField = (
    { input, label, meta: { touched, error }, ...custom },
  ) => (
    <TextField
      label={label}
      variant="filled"
      hintText={label}
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

const SignUp = props => {
    const { handleSubmit, pristine, submitting } = props
    const dispatch = useDispatch();
    return (
        <div className="login-page">
            <img className="logo-img" src="/logo.png" alt ="Logo" />
            <div className="App-header">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                <div>
                        <Field
                            name="accountID"
                            component= {renderTextField}
                            label="Account Number"
                        />
                    </div>
                    <div>
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
                    <div>
                        <Field
                            name="confirmedPword"
                            type="password"
                            component= {renderTextField}
                            label="Confirm Password"
                        />
                    </div>
                    <div>
                        <Field
                            name="balance"
                            component= {renderTextField}
                            label="Balance"
                        />
                    </div>
                    <br/>
                    <div style={{padding: "5px"}}>
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
                        onClick={() => dispatch(renderLogin())}
                        > 
                        Cancel 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default reduxForm({
    form: 'SignUp',
    validate
})(SignUp)

import React from 'react';
import logo from './logo.png';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import validate from './validate';

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
    return (
        <div>
            <div className="App-header">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                <div style={{padding: "10px"}}>
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
                    <div style={{padding: "10px"}}>
                        <button
                        type="submit"
                        className="submit-btn"
                        disabled={ pristine || submitting}
                        >
                        Submit
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

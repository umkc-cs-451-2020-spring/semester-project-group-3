import React from 'react';
import logo from './logo.png';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
        backgroundColor: "white"
    }}
    InputProps={{
        style: {
            color: "black"
        }
    }}
    />
  );

const Login = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <div>
            <br/>
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
                        <div style={{padding: "10px"}}>
                            <button
                            type="submit"
                            className="submit-btn"
                            >
                                Submit
                            </button>
                            <FormControlLabel
                                value="Remember me"
                                control={<Checkbox color="secondary" />}
                                label="Remember me"
                                labelPlacement="bottom"
                            />
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

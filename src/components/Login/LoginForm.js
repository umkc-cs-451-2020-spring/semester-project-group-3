import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { renderApp } from "../../rStore/actions/index";
import logo from './logo.png';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const validate = values => {
    const errors = {}
    const requiredFields = [
        'username',
        'password'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
          errors[field] = 'Required'
        }
    })
    return errors
} 

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
    }) => (
    <TextField 
    style={{
        backgroundColor: "white"
    }}
    InputProps={{
        style: {
            color: "black"
        }
    }}
    color="primary"
    id="filled-basic" 
    label={label} 
    variant="filled" 
    helperText={touched && error}
    //{...input}
    {...custom}
    />)

const Login = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    const dispatch = useDispatch();
    return (
        <div>
            <br/>
                <div className="App-header">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(val => console.log(val))}>
                        <div style={{padding: "10px"}}>
                            <Field
                                name="username"
                                component= {renderTextField}
                                label="Username"
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                component= {renderTextField}
                                label="Password"
                            />
                        </div>
                        <div style={{padding: "10px"}}>
                            <button 
                            type="submit"
                            className="submit-btn"
                            onClick={() => { dispatch(renderApp()) }}
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
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { renderLogin } from '../../rStore/actions/tabChangeActions';
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
        width: "200px",
    }}
    FormHelperTextProps={{
        style: {
            color: "red",
            fontSize: "15px"
        }
    }}
    InputProps={{
        style: {
            borderRadius: "0",
            backgroundColor: "white",
            opacity: "90%",
        }
    }}
    />
  );

const ForgotPass = props => {
    const { handleSubmit, pristine, submitting } = props
    const dispatch = useDispatch();

    const handleClickCancel = (event) => {
        dispatch(renderLogin())
    }

    return (
        <div className="login-page">
            <img className="logo-img" src="/logo.png" alt ="Logo" />
            <div className="App-header">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="email"
                            component= {renderTextField}
                            label="Email"
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
                        onClick={handleClickCancel}
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
    form: 'forgotPass',
    validate
})(ForgotPass)

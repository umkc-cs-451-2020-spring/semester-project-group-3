import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { renderSignUp, renderApp, renderForgotPass } from '../../rStore/actions/tabChangeActions';
import { rememberMe, noRemember, setCurrentUser } from '../../rStore/actions/loginActions';
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

  const GCheckBox = withStyles({
    root: {
        color: "#74BD43",
        '&$checked': {
          color: "#74BD43",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Login = props => {
    const { handleSubmit, pristine, submitting } = props
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        const remembered = localStorage.getItem('rememberMe') === 'true';
        const accountID = rememberMe ? localStorage.getItem('user') : '';
        if(remembered) {
            dispatch(setCurrentUser(accountID));
            dispatch(renderApp());
        }
    });
  
    const handleClickSignUp = (event) => {
        dispatch(renderSignUp());
    }

    const handleClickForgot = (event) => {
        dispatch(renderForgotPass());
    }

    const handleChange = (event) => {
      setChecked(event.target.checked);
      if(event.target.checked === true) {
        dispatch(rememberMe())
      }else{
          dispatch(noRemember())
      }
    };

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
                        <div>
                            <FormControlLabel
                                value="Remember me"
                                control={<GCheckBox defaultUnchecked
                                                    onChange={handleChange} 
                                                    checked={checked} />}
                                label="Remember me"
                                labelPlacement="right"/>
                        </div>
                        <div style={{padding: "10px"}}>
                            <button
                            type="submit"
                            className="login-btn"
                            disabled={ pristine || submitting}
                            >
                                Login
                            </button>
                        </div>
                        <button 
                            type="button" 
                            className="link-btn" 
                            onClick={handleClickSignUp}
                            > 
                            Sign Up 
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button 
                            type="button" 
                            className="link-btn" 
                            onClick={handleClickForgot}
                            > 
                            Forgot password 
                            </button>
                    </form>
                </div>
        </div>
    );
}

export default reduxForm({
    form: 'Login',
    validate
})(Login)

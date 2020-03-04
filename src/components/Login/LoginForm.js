import React from 'react';
import App from '../../pages/App';
import logo from './logo.png';
import UsernamePassword from './UsernamePassword';
import PropTypes from 'prop-types';
import validateInput from '../../rStore/validate/login';


class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            submitted: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if(!isValid) { 
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.isValid()) {
            this.setState({ submitted: true });
            console.log(this.state);
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render () {
        const {errors, username, password} = this.state;
        return (
            <div>
                <img className="logo-img" src={logo} alt ="Logo" />
                <div className="App-header">
                    <h1>Login</h1>
                    <form onSubmit={this.onSubmit}>
                          <UsernamePassword
                            field="username"
                             label="Username "
                            value={username}
                            errors={errors.username}
                            onChange={this.onChange}
                        />

                        <UsernamePassword
                           field="password"
                            label="Password "
                            value={password}
                            errors={errors.password}
                            onChange={this.onChange}
                            type="password"
                        />

                        <button className="submit-btn">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
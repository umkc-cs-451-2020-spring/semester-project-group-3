import React from 'react';
import App from '../../pages/App';
import logo from './logo.png';
import UsernamePassword from './UsernamePassword';
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
            this.setState({ errors: {}, submitted: true });
            // after validating the user we will call login function
            // from rstore actions to authenticate in the db
        }
        console.log(this.state);
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
                            error={errors.username}
                            onChange={this.onChange}
                        />

                        <UsernamePassword
                           field="password"
                            label="Password "
                            value={password}
                            error={errors.password}
                            onChange={this.onChange}
                            type="password"
                        />

                        <button type='submit' className="submit-btn">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../pages/App';
import logo from './logo.png';
import UsernamePassword from './UsernamePassword';

class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
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
                    <form>
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

                        <button onClick={this.handleSubmit} className="submit-btn">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
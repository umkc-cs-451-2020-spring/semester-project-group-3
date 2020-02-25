import React from 'react';
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
            <div className="App-header">
                <img className="logo-img" src={logo} alt ="Logo" />
                    <h1>Login</h1>
                    <form>

                        <div className="form-group">
                            <UsernamePassword
                                field="username"
                                label="Username:"
                                value={username}
                                errors={errors.username}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="form-group">
                            <UsernamePassword
                                field="password"
                                label="Password:"
                                value={password}
                                errors={errors.password}
                                onChange={this.onChange}
                                type="password"
                            />
                        </div>

                        <div>
                            <button className="login-btn">Login</button>
                        </div>

                    </form>
            </div>
        );
    }
}

export default LoginForm;
import React from 'react';
import UsernamePassword from './UsernamePassword';

class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault()
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render () {
        const {errors, identifier, password, } = this.state;
        return (
            <form>
                <h1>Login</h1>

                <UsernamePassword
                    field="identifier"
                    label="Username"
                    value={identifier}
                    errors={errors.identifier}
                    onChange={this.onChange}
                />

                <UsernamePassword
                    field="password"
                    label="Password"
                    value={password}
                    errors={errors.password}
                    onChange={this.onChange}
                    type="password"
                />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Login</button>
                </div>

            </form>
        );
    }
}

export default LoginForm;
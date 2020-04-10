import React, { Component } from 'react';
import MeditationContext from '../meditationcontext';
import AuthApiService from '../services/auth-api-service';

class Login extends Component {

    static contextType = MeditationContext;

    constructor() {
        super();
        this.state = {
            error: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value
        })
            .then(res => {
                const { user } = res;
                this.context.setUserLogin(user)
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
    }

    render() {

        return (
            <div className="login">
                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">
                        <input name="email" type="email" placeholder="Email" required />
                    </label>
                    <label htmlFor="password">
                        <input name="password" type="password" placeholder="Password" required />
                    </label>

                    <button className="loginBtn" type="submit">Login</button>
                </form>
                <p>
                    {this.state.error}
                </p>
            </div>
        )
    }
}

export default Login;

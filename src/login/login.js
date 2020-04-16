import React, { Component } from 'react';
import MeditationContext from '../meditationcontext';
import AuthApiService from '../services/auth-api-service';

class Login extends Component {

    static contextType = MeditationContext;

    constructor() {
        super();
        this.state = {
            error: '',
            status: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        document.getElementsByTagName('html')[0].className += 'wait';

        AuthApiService.postLogin({
            email: email.value,
            password: password.value
        })
            .then(res => {
                if(res.error) {
                    document.getElementsByTagName('html')[0].className -= 'wait';
                    this.setState({
                        error: res.error.message,
                        status: false
                    })
                } else {
                    const { user } = res;
                    this.context.setUserLogin(user)
                    document.getElementsByTagName('html')[0].className -= 'wait';
                    this.setState({
                        status: true
                    })
                }
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

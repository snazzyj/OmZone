import React, {Component} from 'react';
import MeditationContext from '../meditationcontext';

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
        const {email, password} = e.target;
        const user = {
            email: email.value,
            password: password.value
        }
        if(email.value === 'test@gmail.com' && password.value === "Password") {
            this.context.setUserLogin(user)
            // this.props.history.push('/')
        }
    }

    render() {

        return (
            <div className="loginSection">
                <h1>Login</h1>

                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" required/>
                    <label htmlFor="password">Password</label>
                    <input name="password" required />
                    {/* <input name="password" type="password" required /> */}
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
import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service'

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); // eslint-disable-line
const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            },
            error: null
        }
    }

    handleEmail = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        if (name === 'email') {
            errors.email =
                validEmailRegex.test(value)
                    ? ''
                    : 'Email is not valid'
        }

        this.setState({
            errors,
            [name]: value
        })
    }

    handlePassword = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors

        if (name === 'password') {
            errors.password =
                validPasswordRegex.test(value)
                    ? ''
                    : 'Must contain a Number, Upper case letter, Lower case letter and be 6 to 20 characters long'
        }

        this.setState({
            errors,
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { name, email, password } = event.target;

        if (password.value.length >= 6) {
            this.setState({
                error: null
            })

            AuthApiService.postUser({
                name: name.value,
                email: email.value,
                password: password.value
            })
                .then(user => {
                    name.value = '';
                    email.value = '';
                    password.value = ''
                })
                .catch(res => {
                    this.setState({
                        error: res.error
                    })
                })
        } else {
            this.setState({
                error: 'Invalid Password'
            })
        }


    }

    render() {
        const { errors } = this.state;
        return (
            <div className="signupSection">


                <h1>Sign up</h1>

                <form className="signupForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required onChange={this.handleEmail} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required onChange={this.handlePassword} />
                    {errors.email.length > 0 &&
                        <p>{errors.email}</p>}
                    {errors.password.length > 0 &&
                        <p>{errors.password}</p>}

                    <button className="signupBtn">Submit</button>

                </form>
            </div>
        )
    }


}

export default Signup;
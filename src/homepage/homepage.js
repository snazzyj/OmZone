import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm } from '@fortawesome/free-solid-svg-icons'
import Login from '../login/login';
import Signup from '../signup/signup';
import Timer from '../timer/timer';
import Demo from '../demo/demo';
import MeditationContext from '../meditationcontext';
import './homepage.css'


class Homepage extends Component {

    static contextType = MeditationContext;
    render() {

        const { isLoggedIn } = this.context.user

        return (
            <Fragment>
                {isLoggedIn
                    ? <Fragment>
                        <Timer />
                    </Fragment>
                    : <Fragment>
                        <nav className="navbar">
                            <Login />
                        </nav>
                        <section className="container">
                            <div className="title">
                                <h1>Om Zone</h1>
                                <p>"Sleep is the best meditation"</p>
                                <p>-Dalai Lama</p>
                                <FontAwesomeIcon icon={faOm} size="4x" />
                            </div>
                            <Signup />
                        </section>
                        <Demo />

                    </Fragment>
                }
            </Fragment>
        )
    }

}



export default Homepage;
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'
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
            <Fade top cascade duration={1700}>
            <div>
                {isLoggedIn
                    ? <div>
                        <Timer />
                    </div>
                    : <div>
                        <div className="navbar">
                            <nav>
                                <Login />
                            </nav>
                        </div>
                        <section className="container">
                            <div className="title">
                                <h1>Om Zone</h1>
                                <p>"Sleep is the best meditation"</p>
                                <p>-Dalai Lama</p>
                                <FontAwesomeIcon icon={faOm} size="4x" />
                            </div>

                            <div className="signup">
                                <Signup />
                            </div>
                        </section>
                        <div>
                            <Demo />
                        </div>
                    </div>
                }
            </div>
        </Fade>
        )
    }

}



export default Homepage;
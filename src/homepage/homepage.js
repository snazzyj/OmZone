import React, { Component } from 'react';
import Login from '../login/login';
import Signup from '../signup/signup';
import Timer from '../timer/timer';
import DemoLogin from '../demo/demoLogin';
import MeditationContext from '../meditationcontext';

class Homepage extends Component {

    static contextType = MeditationContext;
    render() {

        const { isLoggedIn } = this.context.user

        return (
            <div>
                {isLoggedIn
                    ? <Timer />
                    : <div>
                        <Login />
                        <Signup />
                        <DemoLogin />
                    </div>
                }
            </div>
        )
    }

}

export default Homepage;
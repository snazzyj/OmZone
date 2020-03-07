import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MeditationContext from '../meditationcontext';

class NavBar extends Component {
    static contextType = MeditationContext;
    render() {
        console.log(this.context.user)
        const {isLoggedIn, id} = this.context.user;
        return(
            <div>
                <nav>
                <Link to="/">Om Zone</Link>
                {isLoggedIn && 
                <Link to={`/profile/${id}`}>Profile</Link>
                }
                </nav>
            </div>
        )
    }
}

export default NavBar
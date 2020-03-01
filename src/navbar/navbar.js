import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
    render() {
        return(
            <div>
                <nav>
                <Link to="/">Om Zone</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/timer">Meditate</Link>
                </nav>
            </div>
        )
    }
}

export default NavBar
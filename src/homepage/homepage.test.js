import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './homepage';
import App from '../App';

describe('Homepage Component', () => {
    it('renders without crashing when the user is not logged in',() => {
        const div = document.createElement('div');
        const user = {
            isLoggedIn: false
        }
        ReactDOM.render(
            <App user={user}>
                <Homepage />
            </App>,
            div
        );
        ReactDOM.unmountComponentAtNode(div)
    });
})
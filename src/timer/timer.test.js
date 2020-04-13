import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer';
import Homepage from '../homepage/homepage'
import App from '../App';


describe('Timer Component', () => {
    it('renders without crashing when the user is logged in', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <App>
                <Homepage>
                    <Timer />
                </Homepage>
            </App>,
            div
        );
        ReactDOM.unmountComponentAtNode(div)
    })
})
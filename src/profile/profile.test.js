import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile';
import App from '../App';

describe('Profile Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const user = {
            id: 1,
            isLoggedIn: true,
            medData: [
                {
                    id: 1,
                    date_published: "Apr 13th 2020",
                    minutes: 15
                },
                {
                    id: 1,
                    date_published: "Apr 13th 2020",
                    minutes: 10
                },
                {
                    id: 1,
                    date_published: "Apr 13th 2020",
                    minutes: 7
                }
            ],
            lifetime: {
              days: 1,
              hours: 3,
              mins: 33  
            },
            totalTime: 100,
        }
        ReactDOM.render(
            <App user={user}>
                <Profile />
            </App>, div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
import React, { Component, Fragment } from 'react';
import Popup from 'reactjs-popup';

class DemoInfo extends Component {
    render() {
        return (
            <Fragment>
                <div className="description">
                    <p>
                    Getting into meditation has never been easier. Track your progress, 
                    select a sound cue for the start and end of your time 
                    and even select a background which features an audio track      
                    </p>
                </div>
                <Popup trigger={<button>Getting Started</button>} position="top center" closeOnDocumentClick>
                        <ol>
                            <li>Sign up for an account or Login in to continue</li>
                            <li>Input the time you want to meditate for in minutes</li>
                            <li>Select a sound cue for when the timer starts and stops</li>
                            <li>By selecting a background, a song will be played</li>
                            <li>If you dont want a song to be played, you can mute it to have a silent meditation</li>
                        </ol>
                </Popup>

            </Fragment>
        )
    }
}

export default DemoInfo;
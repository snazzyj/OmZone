import React, { Component, Fragment } from 'react';
import Popup from 'reactjs-popup';

class DemoInfo extends Component {
    render() {
        return (
            <Fragment>
                <Popup trigger={<button>Getting Started</button>} position="bottom center">
                    <div>
                        <p>Input the time you want to meditate for in minutes</p>
                        <p>Select a sound cue for when the timer starts and stops</p>
                        <p>By selecting a background, a song will be played</p>
                        <p>If you dont want a song to be played, you can mute it to have a silent meditation</p>
                    </div>
                </Popup>

            </Fragment>
        )
    }
}

export default DemoInfo;
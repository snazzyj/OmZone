import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

class Sounds extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySound: false,
        }
    }

    //toggles the display options
    displaySoundOptions = () => {
        const { displaySound } = this.state;
        this.setState({
            displaySound: !displaySound
        })
    }

    closeSoundsBox = () => {
        this.setState({
            displaySound: false
        })
    }

    render() {
        return (
            <div className="sounds">
                <button className="soundsBtn" onClick={this.displaySoundOptions}>
                    <FontAwesomeIcon icon={faBell} size="3x" />
                </button>
                <ul className="soundOption">
                    {this.state.displaySound && (
                        <Fragment>
                            {this.props.soundChoice.map(sound =>
                                <li onClick={(sound) => {
                                    this.props.setSoundCue(sound);
                                    this.closeSoundsBox();
                                }} 
                                data-id={sound.id} key={sound.id}>
                                    {sound.id}
                                </li>
                            )}
                        </Fragment>
                    )
                    }
                </ul>
            </div>
        )
    }
}

export default Sounds;
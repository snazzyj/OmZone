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

    render() {

        return (

            <Fragment>

                <div className="currentSelection">
                    <h3>Current Selected Options</h3>
                    <div>
                        <p>Sound Cue</p>
                        <p>{this.props.soundChoice}</p>
                    </div>
                    <div>
                        <p>Background</p>
                        <p>{this.props.backgroundChoice ? this.props.backgroundChoice : 'None Selected'}</p>
                    </div>
                    <div>
                        <p>Song</p>
                        <p>{this.props.songChoice ? this.props.songChoice : 'None Selected'}</p>
                    </div>
                </div>


                <div className="sounds">
                    <button className="soundsBtn" onClick={this.displaySoundOptions}>
                        <FontAwesomeIcon icon={faBell} size="3x" />
                    </button>

                    {this.state.displaySound && (
                        <div className="soundOption" role="radiogroup">
                            <button onClick={this.props.setSoundCue} value="Bell" role="radio" aria-checked="false">Bell</button>
                            <button onClick={this.props.setSoundCue} value="Gong">Gong</button>
                            <button onClick={this.props.setSoundCue} value="Cymbal">Cymbal</button>
                        </div>
                    )}

                </div>
            </Fragment>
        )
    }

}

export default Sounds;
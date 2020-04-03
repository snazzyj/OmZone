import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

class Background extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayBackground: false
        }
    }

    //toggles the display options
    displayBackgroundOptions = () => {
        const { displayBackground } = this.state;
        this.setState({
          displayBackground: !displayBackground
        })
    }

    render() {
        return (
            <div className="backgrounds">

              <button className="bgBtn" onClick={this.displayBackgroundOptions}>
                <FontAwesomeIcon icon={faImage} size="3x" />
              </button>

              {this.state.displayBackground && (
                <div className="bgOptions">
                  <button onClick={this.props.setBackground} value="Mountains">Mountains</button>
                  <button onClick={this.props.setBackground} value="Rocks">Rocks</button>
                  <button onClick={this.props.setBackground} value="Beach">Beach</button>
                  <button onClick={this.props.setBackground} value="River">River</button>
                </div>
              )}
            </div>
        )
    }
}

export default Background;
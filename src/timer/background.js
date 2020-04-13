import React, { Component, Fragment } from 'react';
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

  closeBackgroundBox = () => {
    this.setState({
      displayBackground: false
    })
  }

  render() {
    return (
      <div className="backgrounds">
        <button className="bgBtn" onClick={this.displayBackgroundOptions}>
          <FontAwesomeIcon icon={faImage} size="3x" />
        </button>

        <ul className="bgOptions">
          {this.state.displayBackground && (
            <Fragment>
              {this.props.backgroundChoice.map(bg =>
                <li onClick={(bg) => {
                  this.props.setBackground(bg);
                  this.closeBackgroundBox();
                  }} data-id={bg.id} key={bg.id}>
                  {bg.id}
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

export default Background;
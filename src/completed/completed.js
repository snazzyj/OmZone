import React, {Component} from 'react';

class Completed extends Component {

    render() {
        const {minutes} = this.props
        return (
            <div>
                <h1>Good work</h1>
                <p>You meditated for {minutes} minutes</p>
            </div>
        )
    }

}

export default Completed
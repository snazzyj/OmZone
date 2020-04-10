import React, { Component, Fragment } from 'react';
import config from '../config';
import MeditationContext from '../meditationcontext';

class Completed extends Component {

    static contextType = MeditationContext;

    componentDidMount() {
        let url = `${config.API_ENDPOINT}/medtracker`
        const { minutes, id } = this.props;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                minutes,
                id
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.error)
                }

                return res.json()
            })
            .then(data => {
                this.context.updateUserData(data)
            })
            .catch(error => {
                alert(error)
            })
    }

    render() {
        const { minutes } = this.props
        return (
            <Fragment>
                <h1>Good work</h1>
                <p>You meditated for {minutes} minutes</p>
                <button onClick={this.props.closeCompletedBox}>Close</button>
            </Fragment>
        )
    }

}

export default Completed
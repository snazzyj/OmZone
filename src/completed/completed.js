import React, {Component} from 'react';
import config from '../config';
import MeditationContext from '../meditationcontext';

class Completed extends Component {

    static contextType = MeditationContext;

    componentDidMount() {
        let url = `${config.API_ENDPOINT}/medtracker`
        const {minutes, id} = this.props;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                minutes,
                id
            })
        })
        .then(res => {
            if(!res.ok) {
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
import React, {Component} from 'react';
import BarGraph from '../bargraph/bargraph';
import MeditationContext from '../meditationcontext';


class Profile extends Component {

    static contextType = MeditationContext;
    render() {
        const {user} = this.context;

        return(
            <section className="profileSection">
                <BarGraph />
            </section>
        )
    }
}

export default Profile
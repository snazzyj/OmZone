import React, {Component} from 'react';
import BarGraph from '../bargraph/bargraph';
import MeditationContext from '../meditationcontext';
import './profile.css'

class Profile extends Component {

    static contextType = MeditationContext;

    countTotalMinutes = (user) => {

        if(user.medData.length !== 0) {
            let total = user.medData
            .map((element) => {
                return element.minutes
            })
            .reduce((prev, curr) => {
                return prev+curr
            })
            return total
        } else {
            return 0;
        }
    }

    getAverage = (user) => {
        if(user.medData.length !== 0 ) {
            let average = user.medData
            .map((element) => {
                return element.minutes
            })
            .reduce((prev, curr) => {
                return prev+curr
            }) / user.medData.length;
    
            return Math.round(average);
        } else {
            return 0;
        }
    }

    render() {
        const {user} = this.context;

        return(
            <section className="profileSection">
                <div>
                <BarGraph />
                </div>
                <div>
                    <h3>Last 7 Meditations</h3>
                    <p>
                        Total time spent Meditating: {this.countTotalMinutes(user)} minutes
                    </p>
                    <p>
                        Average time spent Meditating: {this.getAverage(user)} minutes
                    </p>
                </div>
            </section>
        )
    }
}

export default Profile
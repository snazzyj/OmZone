import React, { Component } from 'react';
import BarGraph from '../bargraph/bargraph';
import MeditationContext from '../meditationcontext';
import './profile.css'

class Profile extends Component {

    static contextType = MeditationContext;

    count7DayTotalMinutes = (user) => {

        if (user.medData.length !== 0) {
            let total = user.medData
                .map((element) => {
                    return element.Minutes
                })
                .reduce((prev, curr) => {
                    return prev + curr
                })
            return total
        } else {
            return 0;
        }
    }

    getAverage = (user) => {
        if (user.medData.length !== 0) {
            let average = user.medData
                .map((element) => {
                    return element.Minutes
                })
                .reduce((prev, curr) => {
                    return prev + curr
                }) / user.medData.length;

            return Math.round(average);
        } else {
            return 0;
        }
    }

    convertMinutes = (user) => {
        const { totalTime } = user;
        let days = Math.floor(totalTime / 1440);
        let hours = Math.floor((totalTime % 1440) / 60);
        let mins = totalTime % 60;

        let data = {
            Days: days,
            Hours: hours,
            Minutes: mins
        }
        return data
    }

    render() {
        const { user } = this.context;
        const time = this.convertMinutes(user);

        return (
            <section className="profileSection">
                <div>
                    <BarGraph />
                </div>
                <section>
                    <h1>Stats</h1>
                    <div>
                        <h3>Lifetime</h3>
                        <p>Days: {time.Days}</p>
                        <p>Hours: {time.Hours}</p>
                        <p>Minutes: {time.Minutes}</p>
                    </div>
                    <div>
                        <h3>Last 7 Meditations</h3>
                        <p>
                            Total time spent Meditating: {this.count7DayTotalMinutes(user)} minutes
                    </p>
                        <p>
                            Average time spent Meditating: {this.getAverage(user)} minutes
                    </p>
                    </div>
                </section>
            </section>
        )
    }
}

export default Profile
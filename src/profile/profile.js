import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import BarGraph from '../bargraph/bargraph';
import MeditationContext from '../meditationcontext';
import './profile.css'
import '../timer/timer.css'

class Profile extends Component {

    static contextType = MeditationContext;

    state = {
        urlName: ''
    }

    count7DayTotalMinutes = (user) => {

        if (user.medData.length !== 0) {
            let total = user.medData
                .map((element) => {
                    return element.minutes
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
                    return element.minutes
                })
                .reduce((prev, curr) => {
                    return prev + curr
                }) / user.medData.length;

            return Math.round(average);
        } else {
            return 0;
        }
    }

    showText = () => {
        this.setState({
            urlName: 'Timer'
        })
    }

    hideText = () => {
        this.setState({
            urlName: ''
        })
    }

    render() {
        const { user } = this.context;
        const { lifetime } = this.context.user

        return (
            <Fragment>
                <div className="nav fadeIn">
                <Link to='/' onMouseEnter={this.showText} onMouseLeave={this.hideText}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} size='1x'/>
                        <span>
                        {this.state.urlName}
                        </span>
                    </Link>
                </div>
                <section className="profile  fadeIn">
                    <div>
                        <BarGraph />
                    </div>
                    <section className="stats">
                        <h1>Stats</h1>
                        <div className="lifetime">
                            <h3>Lifetime</h3>
                            <p>Days: {lifetime.days}</p>
                            <p>Hours: {lifetime.hours}</p>
                            <p>Minutes: {lifetime.mins}</p>
                        </div>
                        <div className="lastentries">
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
            </Fragment>
        )
    }
}

export default Profile
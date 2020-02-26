import React, { Component } from 'react';
import MeditationContext from '../meditationcontext';

class Timer extends Component {

  static contextType = MeditationContext
  constructor() {
    super();
    this.state = { 
      time: {}, 
      seconds: 0,
      timer: 0
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    console.log({ secs })
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  componentDidUpdate(prevState) {
    if (this.state !== prevState) { }
  }

  setTime = (e) => {
    this.setState({
      seconds: parseInt(e.target.value)
    })
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer)
    }
  }

  render() {
    console.log(this.state)
    // let time = this.state.timer
    let timer = this.timer;
    console.log({timer})
    // console.log({time})
    return (
      <div>
        <input type="number" onChange={this.setTime} required />
        <button onClick={this.startTimer}>Start</button>
        m: {this.state.time.m} s: {this.state.time.s}
      </div>
    );
  }
}

export default Timer
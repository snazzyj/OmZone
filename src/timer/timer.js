import React, { Component } from 'react';
// import TimerInput from '../timerInput/timerinput'
// import StartButton from '../start/start'
import MeditationContext from '../meditationcontext';
import CountdownTimer from 'react-component-countdown-timer';

class Timer extends Component {

  static contextType = MeditationContext

  constructor() {
    super();
    this.state = {
      time: 0,
      timeRemaining: 0
    }
  }

  // componentDidMount() {
    
  //   let {time, timeRemaining} = this.state

  //   let seconds = Math.floor(timeRemaining * 60)
  //   this.setState({
  //     timeRemaining: seconds
  //   })
  //   console.log({seconds})
    
  // }

  setTimer = (event) => {
    
    let minutes = parseInt(event.target.value)

    console.log({minutes})
    
    this.setState({
      time: minutes,
      timeRemaining: minutes
    })
  }

  startCountdown = () => {

    let {timeRemaining} = this.state;

    let seconds = Math.floor(timeRemaining * 60);

    this.setState({
      timeRemaining: seconds
    })

    console.log(this.state.timeRemaining)

  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    console.log({timeLeftVar})
    this.setState({ time: timeLeftVar });
  }

  startTimer = () => {
    if(this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    console.log('click')
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {

    const { minutes, seconds } = this.state

    console.log(this.state)

    return (
      <div>
        <div style={{ marginLeft: 100 }}>
          <h3>Input your desired time</h3>
          <input type="number" onChange={this.setTimer} required />
        </div>
        {/* <h1>Hello world from timer</h1> */}
        {/* <TimerInput minutes={minutes} 
        // handleChange={this.handleChange} 
        /> */}
        <h1 style={{ fontSize: 100, marginLeft: 100 }}>
          {minutes}:{seconds}
        </h1>
        <div style={{ marginLeft: 130 }}>
          <button onClick={this.startTimer}>Start</button>
        </div>
      </div>
    );
  }
}
export default Timer
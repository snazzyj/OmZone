import React, { Component } from 'react';
import MeditationContext from '../meditationcontext';
import UIFx from 'uifx';
import bellAudio from '../soundcues/337048__shinephoenixstormcrow__131348-kaonaya-bell-at-daitokuji-temple-kyoto-modified.mp3';
import gongAudio from '../soundcues/56240__q-k__gong-center-clear.wav';
import cymbalAudio from '../soundcues/435074__steffcaffrey__tingsha-cymbal.wav';
import Mountains from '../images/mountains.jpg';
import Beach from '../images/Sunrise-Beach.jpg';
import Rocks from '../images/BalanceRocksSea.jpg';
import River from '../images/river.jpg'

const bell = new UIFx(bellAudio);
const gong = new UIFx(gongAudio);
const cymbal = new UIFx(cymbalAudio);
const soundCues = [
  {
    id: 'Bell',
    sound: bell
  },
  {
    id: 'Gong',
    sound: gong
  },
  {
    id: 'Cymbal',
    sound: cymbal
  }
];

const backgrounds = [
  {
    id: 'Mountains',
    background: Mountains,
  },
  {
    id: 'Beach',
    background: Beach,
  },
  {
    id: 'Rocks',
    background: Rocks,
  },
  {
    id: 'River',
    background: River
  }
]

class Timer extends Component {

  static contextType = MeditationContext
  constructor() {
    super();
    this.state = { 
      time: {}, 
      seconds: 0,
      timer: 0,
      audio: bell,
      backgound: ''
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

    let image = this.state.backgound;

    document.body.style.backgroundImage = `url(${image})`
  }

  componentWillMount() {
    clearInterval(this.timer);
  }

  setTime = (e) => {
    this.setState({
      seconds: parseInt(Math.floor(e.target.value * 60))
    })
  }

  startTimer = () => {
    const {audio} = this.state
    if (this.timer === 0 && this.state.seconds > 0) {
      audio.play();
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  
  countDown = () => {
    // Remove one second, set state so a re-render happens.
    const {audio} = this.state
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) {
      audio.play();
      clearInterval(this.timer)
    }
  }
  
  setBellCue = (event) => {
    console.log(event.currentTarget.value)
    let value = event.currentTarget.value;

    const soundOption = soundCues.find(audio => audio.id === value)
    console.log(soundOption)


    this.setState({
      audio: soundOption.sound
    })
  }

  setBackground = (event) => {
    let value = event.currentTarget.value;

    let newBg = backgrounds.find(bg => bg.id === value)
    console.log(newBg)

    this.setState({
      backgound: newBg.background
    })
  }
  
  render() {
    console.log(this.state)
    console.log(backgrounds)
    // let time = this.state.timer
    let timer = this.timer;
    console.log({timer})
    
    return (
      <section>
        <div>
        <input type="number" onChange={this.setTime} required />
        <button onClick={this.startTimer}>Start</button>
        m: {this.state.time.m} s: {this.state.time.s}
        </div>

        <div>
          <button onClick={this.setBellCue} value="Bell">Bell</button>
          <button onClick={this.setBellCue} value="Cymbal">Cymbal</button>
          <button onClick={this.setBellCue} value="Gong">Gong</button>
        </div>

        <div>
          <button onClick={this.setBackground} value="Mountains">Mountains</button>
          <button onClick={this.setBackground} value="Rocks">Rocks</button>
          <button onClick={this.setBackground} value="Beach">Beach</button>
          <button onClick={this.setBackground} value="River">River</button>
        </div>
      </section>
    );
  }
}

export default Timer
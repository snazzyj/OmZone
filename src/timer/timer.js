import React, { Component } from 'react';
import UIFx from 'uifx';
import Completed from '../completed/completed';
import MeditationContext from '../meditationcontext';
import bellAudio from '../assests/soundcues/337048__shinephoenixstormcrow__131348-kaonaya-bell-at-daitokuji-temple-kyoto-modified.mp3';
import gongAudio from '../assests/soundcues/56240__q-k__gong-center-clear.wav';
import cymbalAudio from '../assests/soundcues/435074__steffcaffrey__tingsha-cymbal.wav';
import beachSound from '../assests/backgroundSound/ocean.wav';
import riverSound from '../assests/backgroundSound/rain-and-forest.mp3';
import mountainSound from '../assests/backgroundSound/birds.mp3';
import rockSound from '../assests/backgroundSound/river-shore.mp3';
import Mountains from '../assests/images/mountains.jpg';
import Beach from '../assests/images/Sunrise-Beach.jpg';
import Rocks from '../assests/images/BalanceRocksSea.jpg';
import River from '../assests/images/river.jpg'

const beachAudio = new Audio(beachSound);
const riverAudio = new Audio(riverSound);
const mountainAudio = new Audio(mountainSound);
const rockAudio = new Audio(rockSound)
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
    backgroundSound: mountainAudio
  },
  {
    id: 'Beach',
    background: Beach,
    backgroundSound: beachAudio
  },
  {
    id: 'Rocks',
    background: Rocks,
    backgroundSound: rockAudio
  },
  {
    id: 'River',
    background: River,
    backgroundSound: riverAudio
  }
]

class Timer extends Component {

  static contextType = MeditationContext
  constructor() {
    super();
    this.state = {
      time: {},
      seconds: 0,
      desiredTime: 0,
      soundCue: bell,
      backgound: '',
      backgroundSound: null,
      isMuted: false,
      isStarted: false,
      isCompleted: false
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
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
    clearInterval(this.timer);
  }

  componentDidUpdate(prevState) {
    if (this.state !== prevState) { }

    let image = this.state.backgound;

    document.body.style.backgroundImage = `url(${image})`
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = 'none';
    clearInterval(this.timer);
  }

  setTime = (e) => {
    this.setState({
      seconds: parseInt(Math.floor(e.target.value * 60)),
      desiredTime: e.target.value
    })
  }

  startTimer = () => {
    const { soundCue, backgroundSound, isMuted } = this.state

    if (this.timer === 0 && this.state.seconds > 0) {
      soundCue.play();
      if (!isMuted && backgroundSound !== null) {
        backgroundSound.play();
      }
      this.timer = setInterval(this.countDown, 1000);
      this.setState({ isStarted: true })
    }
  }

  countDown = () => {
    const { soundCue, backgroundSound } = this.state

    if (backgroundSound !== null) {
      backgroundSound.loop = true;
    }
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      if (backgroundSound !== null) {
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
      }
      soundCue.play();
      clearInterval(this.timer)
      this.setState({
        isCompleted: true
      })
    }
  }

  //sets starter and end sound cue
  setSoundCue = (event) => {
    let value = event.currentTarget.value;
    const soundOption = soundCues.find(audio => audio.id === value)
    this.setState({
      soundCue: soundOption.sound
    })
  }

  //sets document background and associated background audio file 
  setBackground = (event) => {
    let value = event.currentTarget.value;
    let newBg = backgrounds.find(bg => bg.id === value)
    this.setState({
      backgound: newBg.background,
      backgroundSound: newBg.backgroundSound
    })
  }

  //mutes background sound
  muteBackgroundAudio = () => {
    const { isMuted } = this.state
    this.setState({
      isMuted: !isMuted
    })
  }

  render() {
    const { isStarted, desiredTime } = this.state

    return (
      <section className="timerSection">
        <div>
          <p>{this.state.time.m}<span>:</span>{this.state.time.s}</p>
        </div>
        <div>
          <input type="number" onChange={this.setTime} required />
          <div>
            <button onClick={this.setSoundCue} value="Bell">Bell</button>
            <button onClick={this.setSoundCue} value="Gong">Gong</button>
            <button onClick={this.setSoundCue} value="Cymbal">Cymbal</button>
          </div>
          <div>
            <audio preload="auto">
              <source src={beachAudio} type="audio/wav" />
              <source src={riverAudio} type="audio/mp3" />
              <source src={mountainAudio} type="audio/wav" />
              <source src={rockAudio} type="audio/flac" />
            </audio>
            <button onClick={this.setBackground} value="Mountains">Mountains</button>
            <button onClick={this.setBackground} value="Rocks">Rocks</button>
            <button onClick={this.setBackground} value="Beach">Beach</button>
            <button onClick={this.setBackground} value="River">River</button>
            <button onClick={this.muteBackgroundAudio}>Mute</button>
          </div>
        </div>
        <div>
          <button onClick={this.startTimer} disabled={isStarted}>Start</button>
        </div>

        <div>
          {this.state.isCompleted && <Completed minutes={desiredTime} id={this.context.user.id} />}
        </div>
      </section>
    );
  }
}

export default Timer
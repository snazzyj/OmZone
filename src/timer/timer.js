import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UIFx from 'uifx';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeDown, faPlay, faStopwatch, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Completed from '../completed/completed';
import MeditationContext from '../meditationcontext';
import Sounds from './sounds';
import Background from './background';
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
import River from '../assests/images/river.jpg';
import './timer.css'

function TimeView(props) {
  const { s, m } = props.time;
  return <p>{m}<span>:</span>{s}</p>
}

function CurrentSelection(props) {
  const { sound, background, song } = props;
  return (
    <div className="currentSelection">
      <h3>Current Selected Options</h3>
      <div>
        <p>Sound Cue</p>
        <p>{sound}</p>
      </div>
      <div>
        <p>Background</p>
        <p>{background ? background : 'None Selected'}</p>
      </div>
      <div>
        <p>Song</p>
        <p>{song ? song : 'None Selected'}</p>
      </div>
    </div>
  )
}

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
    backgroundSound: mountainAudio,
    song: 'Birds'
  },
  {
    id: 'Beach',
    background: Beach,
    backgroundSound: beachAudio,
    song: 'Ocean'
  },
  {
    id: 'Rocks',
    background: Rocks,
    backgroundSound: rockAudio,
    song: 'River Shore line'
  },
  {
    id: 'River',
    background: River,
    backgroundSound: riverAudio,
    song: 'Rain Forest'
  }
]

class Timer extends Component {

  static contextType = MeditationContext
  constructor() {
    super();
    this.groupProps = {
      appear: false,
      enter: true,
      exit: true
    }
    this.state = {
      time: {},
      seconds: 0,
      desiredTime: 0,
      soundCue: bell,
      soundChoice: 'Bell',
      background: '',
      backgroundChoice: '',
      backgroundSound: null,
      songChoce: '',
      isMuted: false,
      muteBtnColor: '#000000',
      isStarted: false,
      isCompleted: false,
      visible: true,
      urlName: '',
      error: ''
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    clearInterval(this.timer);
  }

  componentDidUpdate(prevState) {
    if (this.state !== prevState) { }

    let image = this.state.background;

    document.body.style.backgroundImage = `url(${image})`
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = 'none';
    clearInterval(this.timer);
  }

  //sets inital time
  setTime = (e) => {
    this.setState({
      seconds: parseInt(Math.floor(e.target.value * 60)),
      desiredTime: e.target.value
    })
  }

  //starts the timer, and background sound
  startTimer = () => {
    const { soundCue, backgroundSound, isMuted } = this.state

    if (this.state.seconds === 0) {
      this.setState({
        error: 'No time inputted'
      })
    }

    if (this.timer === 0 && this.state.seconds > 0) {
      soundCue.play();
      if (!isMuted && backgroundSound !== null) {
        backgroundSound.volume = 0.1
        backgroundSound.loop = true;
        backgroundSound.play();
        setTimeout(function () {
          console.log(backgroundSound.volume)
          backgroundSound.volume += 0.1
          console.log(backgroundSound.volume)
        }, 5000)
      }
      this.timer = setInterval(this.countDown, 1000);
      this.setState({ isStarted: true, visible: false })
    }
  }

  secondsToTime(secs) {
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }

    let obj = {
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  countDown = () => {
    const { soundCue, backgroundSound } = this.state

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
      this.timer = 0;
      this.setState({
        isCompleted: true,
        isStarted: false,
        visible: true
      })
    }
  }

  //sets starter and end sound cue
  setSoundCue = (event) => {
    let value = event.currentTarget.dataset.id;
    const soundOption = soundCues.find(audio => audio.id === value)
    this.setState({
      soundCue: soundOption.sound,
      soundChoice: soundOption.id
    })
  }

  //sets document background and associated background audio file 
  setBackground = (event) => {
    let value = event.currentTarget.dataset.id;
    let newBg = backgrounds.find(bg => bg.id === value)
    this.setState({
      background: newBg.background,
      backgroundSound: newBg.backgroundSound,
      backgroundChoice: newBg.id,
      songChoice: newBg.song
    })
  }

  //mutes background sound
  muteBackgroundAudio = () => {
    const { isMuted, backgroundSound } = this.state

    this.setState({
      isMuted: !isMuted,
    })

    if (backgroundSound !== null) {
      backgroundSound.muted = !backgroundSound.muted
    }
  }

  showText = () => {
    this.setState({
      urlName: 'Profile'
    })
  }

  hideText = () => {
    this.setState({
      urlName: ''
    })
  }

  render() {
    const { isStarted, desiredTime, soundChoice, songChoice, backgroundChoice } = this.state;
    const { id } = this.context.user
    console.log(this.state)
    return (
      <Fade top cascade duration={1500}>

        <div className="timerNav">
          <Link to={`/profile/${id}`} onMouseEnter={this.showText} onMouseLeave={this.hideText}>
            <span>
              {this.state.urlName}
            </span>
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Link>
        </div>

        <section className="timer">
          <div className="countDown">
            <label>
              <FontAwesomeIcon icon={faStopwatch} size="4x" />
            </label>
            <TimeView time={this.state.time} />
          </div>

          <Fade bottom duration={1000} when={!isStarted}>
            <div className="start">
              <button className="startBtn" onClick={this.startTimer} disabled={isStarted}>
                <FontAwesomeIcon icon={faPlay} size="2x" />
              </button>
            </div>

            <div className="input">
              <label>Desired Time</label>
              <input className="time" type="text" onChange={this.setTime} maxLength="2" size="2" placeholder="10" required />
              <p>{this.state.error}</p>
            </div>

            <div className="selections">

              <CurrentSelection sound={soundChoice} background={backgroundChoice} song={songChoice} />
              <div className="options">


                <Sounds setSoundCue={this.setSoundCue} soundChoice={soundCues} />

                <Background setBackground={this.setBackground} backgroundChoice={backgrounds}>
                  <audio preload="auto">
                    <source src={beachAudio} type="audio/wav" />
                    <source src={riverAudio} type="audio/mp3" />
                    <source src={mountainAudio} type="audio/wav" />
                    <source src={rockAudio} type="audio/flac" />
                  </audio>
                </Background>


                <button style={{ color: this.state.muteBtnColor }} className="muteBtn" onClick={this.muteBackgroundAudio}>
                {this.state.isMuted ? <FontAwesomeIcon icon={faVolumeMute} size="3x" /> : <FontAwesomeIcon icon={faVolumeDown} size="3x" />}
                </button>
              </div>
            </div>
          </Fade>

          <div>
            {this.state.isCompleted &&
              <Bounce top>
                <Completed minutes={desiredTime} id={this.context.user.id} />
              </Bounce>
            }
          </div>
        </section>
      </Fade>
    );
  }
}

export default Timer
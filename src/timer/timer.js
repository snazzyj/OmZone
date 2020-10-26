import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import UIFx from 'uifx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeDown, faPlay } from '@fortawesome/free-solid-svg-icons';
import Completed from '../completed/completed';
import MeditationContext from '../meditationcontext';
import TokenService from '../services/token-service'
import Sounds from './sounds';
import Background from './background';
import bellAudio from '../assests/soundcues/337048__shinephoenixstormcrow__131348-kaonaya-bell-at-daitokuji-temple-kyoto-modified.mp3';
import gongAudio from '../assests/soundcues/56240__q-k__gong-center-clear.wav';
import cymbalAudio from '../assests/soundcues/435074__steffcaffrey__tingsha-cymbal.wav';
import beachSound from '../assests/backgroundSound/IslandShore.mp3';
import riverSound from '../assests/backgroundSound/Forest.mp3';
import mountainSound from '../assests/backgroundSound/Mountain.mp3';
import rockSound from '../assests/backgroundSound/Autumn.mp3';
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
  const { sound, background, isMuted } = props;
  return (
    <div className="currentSelection">
      <h3>Current Selected Options</h3>
      <div>
        <p>Sound Cue</p>
        <p>{sound}</p>
      </div>
      <div>
        <p>Ambiance</p>
        <p>{isMuted ? 'Off' : 'On'}</p>
      </div>
      <div>
        <p>Background</p>
        <p>{background ? background : 'None Selected'}</p>
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
      seconds: 300,
      soundCue: bell,
      soundChoice: 'Bell',
      background: '',
      backgroundChoice: '',
      backgroundSound: null,
      songChoce: '',
      isMuted: false,
      isStarted: false,
      isCompleted: false,
      visible: true,
      error: ''
    };
    this.timer = 0;
    this.desiredTime = 5;
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
    const { backgroundSound } = this.state;
    document.body.style.backgroundImage = 'none';
    clearInterval(this.timer);
    if (backgroundSound) {
      backgroundSound.pause();
      backgroundSound.currentTime = 0;
    }
  }

  //sets inital time
  setTime = (e) => {
    this.desiredTime = e.target.value
    this.setState({
      seconds: parseInt(Math.floor(e.target.value * 60)),
    })
  }

  //starts the countdown timer
  //playing the audio cue to begin and playing a background
  //song if there is one
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
        this.fadeIn();
      }
      this.timer = setInterval(this.countDown, 1000);
      this.setState({ isStarted: true, visible: false })
    }
  }

  //converts seconds into minutes and seconds
  //checks to see if the time is less than 10
  //appends a 0 if it is
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
    const { soundCue, backgroundSound } = this.state;
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (backgroundSound !== null && backgroundSound.duration < 7) {
      this.fadeOut();
    }

    // Check if we're at zero.
    //if we are, and there is a song,
    //fade the song out and set current time to 0
    //otherwise clear the intervals and play the sound cue
    //to signal the end
    if (seconds === 0) {
      if (backgroundSound !== null) {
        this.endSong().then(() => {
          backgroundSound.pause();
          backgroundSound.currentTime = 0;
        })
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

  //fades in background audio at a slow pace over 5 seconds
  fadeIn = () => {
    const { backgroundSound } = this.state;
    if (backgroundSound.volume) {
      let intial = 0.1;
      let setVolume = 0.5; // Target volume level for new song
      let speed = 0.005; // Rate of increase
      backgroundSound.volume = intial;
      let eAudio = setInterval(function () {
        intial += speed;
        backgroundSound.volume = intial.toFixed(1);
        if (intial.toFixed(1) >= setVolume) {
          clearInterval(eAudio);
        };
      }, 50);
    };
  };

  //fades out the background audio within 5 seconds
  fadeOut = () => {
    const { backgroundSound } = this.state;

    if (backgroundSound.volume) {
      let intial = 0.5;
      let setVolume = 0; // Target volume level for new song
      let speed = 0.005; // Rate of increase
      backgroundSound.volume = intial;
      let qAudio = setInterval(function () {
        intial = intial - speed;
        backgroundSound.volume = intial.toFixed(1);
        if (intial.toFixed(1) <= setVolume) {
          clearInterval(qAudio);
        };
      }, 50);
    };
  };

  //returns a promise when the song volume has been faded
  //out to 0 over 5 seconds
  endSong = () => {
    const { backgroundSound } = this.state;

    return new Promise((resolve, reject) => {
      if (backgroundSound.volume) {
        let intial = 0.5;
        let setVolume = 0; // Target volume level for new song
        let speed = 0.005; // Rate of increase
        backgroundSound.volume = intial;
        let qAudio = setInterval(function () {
          intial = intial - speed;
          backgroundSound.volume = intial.toFixed(1);
          if (intial.toFixed(1) <= setVolume) {
            // backgroundSound.pause();
            // backgroundSound.currentTime = 0;
            clearInterval(qAudio);
            resolve(true)
          };
        }, 50
        );
      };
    })
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

  closeCompletedBox = () => {
    this.setState({
      isCompleted: false
    })
    this.desiredTime = 5;
  }

  handleLogout = (e) => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.context.setUserLogout();
  }

  render() {
    const { isStarted, soundChoice, backgroundChoice, isMuted } = this.state;
    const { id } = this.context.user
    return (
      <Fragment>


        <div className="timerNav fadeIn">
          <Link className="profileLink" to={`/profile/${id}`} >
            Profile
          </Link>

          <Link className="logout" to="/" onClick={this.handleLogout}>
            Logout
          </Link>
        </div>
        <section className="timer fadeIn">


          <div className={!isStarted ? "input fadeIn" : "fadeOut"}>
            <label>Desired Time</label>
            <input className="time" type="number" onChange={this.setTime} min="1" max="60" placeholder={5} required />
            <p>{this.state.error}</p>
          </div>

          <div className={!isStarted ? "selections fadeIn" : "fadeOut"}>

            <CurrentSelection sound={soundChoice} background={backgroundChoice} isMuted={isMuted} />
            <div className="options">


              <Sounds setSoundCue={this.setSoundCue} soundChoice={soundCues} />

              <button className="muteBtn" onClick={this.muteBackgroundAudio}>
                {this.state.isMuted ? <FontAwesomeIcon icon={faVolumeMute} size="3x" /> : <FontAwesomeIcon icon={faVolumeDown} size="3x" />}
              </button>

              <Background setBackground={this.setBackground} backgroundChoice={backgrounds}>
                <audio preload="auto">
                  <source src={beachAudio} type="audio/wav" />
                  <source src={riverAudio} type="audio/mp3" />
                  <source src={mountainAudio} type="audio/wav" />
                  <source src={rockAudio} type="audio/flac" />
                </audio>
              </Background>

            </div>
          </div>
            <div className="countDown">
              <TimeView time={this.state.time} />
            </div>
            <div className={!isStarted ? "start fadeIn" : "fadeOut"}>
              <button className="startBtn" onClick={this.startTimer} disabled={isStarted}>
                <FontAwesomeIcon icon={faPlay} size="4x" />
              </button>
            </div>


          {this.state.isCompleted &&
            <div className="completed">
              <Completed minutes={this.desiredTime} id={this.context.user.id} closeCompletedBox={this.closeCompletedBox} />
            </div>
          }
        </section>
      </Fragment>
    );
  }
}

export default Timer
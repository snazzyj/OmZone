import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {activateKeepAwake} from 'expo-keep-awake';
import MeditationContext from './meditationcontext';
import Profile from './profile/profile'
import Login from './login/login';
import Signup from './signup/signup';
import Homepage from './homepage/homepage';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:
      {
        id: 1,
        isLoggedIn: true,
        medData: [],
        lifetime: {},
        totalTime: 0
      },
      shouldBeAwake: true
    }
  }

  //calls setAwakeStatus upon intial render
  componentDidMount() {
    this.setAwakeStatus();
  }
  componentDidUpdate(prevState) {
    if(this.state.user !== prevState.user) {}
  }

  //Sets intial state upon login with user data
  setUserLogin = user => {
    this.setState({
      user: {
        id: user.id,
        isLoggedIn: true,
        medData: user.medData,
        lifetime: this.convertMinutes(user.totalTime),
        totalTime: user.totalTime
      }
    })
  }
  
  //counts the total minutes
  countTotalMinutes = (array) => {
    if(array.length === 0) {return 0}
    return array.reduce((a,b) => ({minutes: a.minutes + b.minutes}));
  }
  
  //convert total mins into days, hours, min format
  convertMinutes = (number) => {
    if(number === 0) {return 0}
    let days = Math.floor(number / 1440);
    let hours = Math.floor((number % 1440) / 60);
    let mins = number % 60;

    return {days, hours, mins}
  }

  //updates the user state obj upon completing a meditation
  updateUserData = (newLog) => {
    let {medData, totalTime} = this.state.user;
    const {minutes} = newLog
    let newTotal = totalTime + minutes;
    let updated = medData;

    updated.pop();
    updated.push(newLog)

    let newLiftetime = this.convertMinutes(newTotal)

    this.setState({
      user: {
        ...this.state.user,
        medData: updated,
        lifetime: newLiftetime,
        totalTime: newTotal
      }
    })
  }

  //tells mobile phones to stay awake
  setAwakeStatus = () => {
    const {shouldBeAwake} = this.state
    if(shouldBeAwake) {
      activateKeepAwake();
    }
  }

  render() {
    const contextValue = {
      user: this.state.user,
      setUserLogin: this.setUserLogin,
      updateUserData: this.updateUserData
    }

    return (
      <div className="App">

        <BrowserRouter>
          <MeditationContext.Provider value={contextValue}>
            <main>
              <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/profile/:id" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="signup" component={Signup} />
              </Switch>
            </main>
          </MeditationContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

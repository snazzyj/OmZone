import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {activateKeepAwake} from 'expo-keep-awake';
import MeditationContext from './meditationcontext';
import NavBar from './navbar/navbar';
import Profile from './profile/profile'
import Login from './login/login';
import Signup from './signup/signup';
import Homepage from './homepage/homepage';
import './App.css';

class App extends Component {

  state = {
    user:
    {
      name: '',
      email: '',
      id: 0,
      isLoggedIn: true,
      totalTime: 0,
      medData: [],
    },
    shouldBeAwake: true
  }

  componentDidMount() {
    this.setAwakeStatus();
  }
  componentDidUpdate(prevState) {
    if(this.state.user !== prevState.user) {}
  }

  setUserLogin = user => {
    // this.setState({
    //   user: {
    //     name: user.name,
    //     email: user.email,
    //     id: user.id,
    //     isLoggedIn: true,
    //     totalTime: user.totalTime,
    //     medData: user.data
    //   }
    // })
    this.setState({
      user: {
        name: 'Foo',
        email: user.email,
        id: 1,
        isLoggedIn: true,
        totalTime: 1600,
        medData: [{ date: 'Mar 1st 2020', Minutes: 10 },
                  { date: 'Mar 2nd 2020', Minutes: 15 },
                  { date: 'Mar 3rd 2020', Minutes: 30 },
                  { date: 'Mar 4th 2020', Minutes: 20 },
                  { date: 'Mar 5th 2020', Minutes: 25 },
                  { date: 'Mar 6th 2020', Minutes: 15 },
                  { date: 'Mar 7th 2020', Minutes: 10 },
                ]
      }
    })
  }

  setAwakeStatus = () => {
    const {shouldBeAwake} = this.state
    if(shouldBeAwake) {
      activateKeepAwake();
    }
  }

  render() {
    const contextValue = {
      user: this.state.user,
      setUserLogin: this.setUserLogin
    }

    return (
      <div className="App">

        <BrowserRouter>
          <MeditationContext.Provider value={contextValue}>
            <NavBar />
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

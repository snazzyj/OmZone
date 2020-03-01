import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MeditationContext from './meditationcontext';
import NavBar from './navbar/navbar';
import Profile from './profile/profile'
import Timer from './timer/timer';
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
      isLoggedIn: false,
      userData: []
    },

  }

  setUserLogin = user => {
    this.setState({
      name: user.name,
      email: user.email,
      id: user.id,
      isLoggedIn: true,
      userData: user.data
    })
  }

  render() {
    console.log(this.state)

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
              <Route exact path="/" component={Homepage} />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/timer" component={Timer} />
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

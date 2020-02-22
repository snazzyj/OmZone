import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MeditationContext from './meditationcontext';
import NavBar from './navbar/navbar';
import Profile from './profile/profile'
import Timer from './timer/timer';
import './App.css';

class App extends Component {

  state = {
    user:
    {
      name: '',
      email: '',
      id: 0,
    },

  }

  render() {
    console.log(this.state)

    const contextValue = {
      user: this.state.user
    }

    return (
      <div className="App">

      <BrowserRouter>
        <MeditationContext.Provider value={contextValue}>
          <NavBar />
          <main>
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route path="/timer" component={Timer} />
            </Switch>
          </main>
        </MeditationContext.Provider>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

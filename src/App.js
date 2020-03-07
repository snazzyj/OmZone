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
      id: 1,
      isLoggedIn: true,
      medData: [{ date: 'Mar 1st 2020', minutes: 10 },
      { date: 'Mar 2nd 2020', minutes: 15 },
      { date: 'Mar 3rd 2020', minutes: 30 },
      { date: 'Mar 4th 2020', minutes: 20 },
      { date: 'Mar 5th 2020', minutes: 25 },
      { date: 'Mar 6th 2020', minutes: 15 },
      { date: 'Mar 7th 2020', minutes: 10 },]
    },

  }

  componentDidUpdate(prevState) {
    if(this.state.user !== prevState.user) {}
  }

  setUserLogin = user => {
    this.setState({
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        isLoggedIn: true,
        userData: user.data
      }
    })
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

import React, { Component } from 'react';
import MeditationContext from '../meditationcontext';

class TimerInput extends Component {

    static contextType = MeditationContext


    render() {

        const {handleChange} = this.context;

      return (
       <div style={{marginLeft:100}}>
          <h3>Input your desired time</h3>
          <input type="number" onChange={handleChange} required />
      </div>
         );
       }
    }
export default TimerInput
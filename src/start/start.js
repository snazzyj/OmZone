import React, { Component } from 'react';
import MeditationContext from '../meditationcontext';

class StartButton extends Component {

    static contextType = MeditationContext

    render() {

        const {startCountDown} = this.context

      return(
       <div style={{ marginLeft: 130 }}>
        <button onClick={startCountDown}>Start</button>
      </div>
       );
   }
 }

 export default StartButton
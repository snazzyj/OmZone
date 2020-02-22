import React from 'react';

const MeditationContext = React.createContext({
    minutes: '00',
    seconds: '00',
    handleChange: () => {},
    tick: () => {},
    startCountdown: () => {}
})

export default MeditationContext
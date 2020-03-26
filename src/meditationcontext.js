import React from 'react';

const MeditationContext = React.createContext({
    setUserLogin: () => {},
    updateUserData: () => {}
})

export default MeditationContext
import React from 'react';

const MeditationContext = React.createContext({
    setUserLogin: () => {},
    setUserLogout: () => {},
    updateUserData: () => {}
})

export default MeditationContext
import React, {Component} from 'react';
import MeditationContext from '../meditationcontext';
import DemoLogin from './demoLogin';
import DemoInfo from './demoInfo';

class Demo extends Component {

    static contextType = MeditationContext;

    render() {
        const {isLoggedIn} = this.context.user
        return (
            <div>
                <h1>Demo Information</h1>
                {isLoggedIn ? <DemoInfo /> : <DemoLogin />}  
            </div>
        )
    }

}

export default Demo;
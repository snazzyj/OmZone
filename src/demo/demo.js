import React, {Component} from 'react';
import MeditationContext from '../meditationcontext';
import DemoLogin from './demoLogin';
import DemoInfo from './demoInfo';

class Demo extends Component {

    static contextType = MeditationContext;

    render() {
        return (
            <div className="demoInfo">
                 <DemoInfo />
                 <DemoLogin />
            </div>
        )
    }

}

export default Demo;
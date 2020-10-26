import React, { Component } from 'react';
import { BarChart, XAxis, YAxis, Bar, Text, ResponsiveContainer, Tooltip, Label } from 'recharts'
import MeditationContext from '../meditationcontext';

class BarGraph extends Component {

    static contextType = MeditationContext;

    render() {
        const { medData } = this.context.user
        return (
            <div>
                <h2>Time Spent Meditating</h2>
                <ResponsiveContainer width='100%' height={500}>
                <BarChart
                    data={medData}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                    fill="#FFD700"
                >
                    <XAxis dataKey="date_published">
                        <Label value="Meditation Sessions" position="insideBottom" offset={-5} fontSize={20} />    
                    </XAxis>

                    <YAxis tickCount={7} tick={{fontSize: 15}} 
                    label={
                        <Text
                            x={0}
                            y={0}
                            dx={40}
                            dy={365}
                            offset={0}
                            angle={-90}
                            fontSize={25}
                            verticalAnchor='end'
                        >
                            Minutes
                    </Text>
                    } />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#FFD700" />
                </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }

}

export default BarGraph
import React, { Component } from 'react';
import { BarChart, XAxis, YAxis, Bar, Text, ResponsiveContainer, Tooltip, Label } from 'recharts'
import MeditationContext from '../meditationcontext';

class BarGraph extends Component {

    static contextType = MeditationContext;

    render() {
        const { medData } = this.context.user
        return (
            <div>

                <ResponsiveContainer width='100%' height={500}>
                <BarChart
                    data={medData}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="date_published" tick={{ fill: 'black' }}>
                        <Label value="Date" position="insideBottom" offset={-5}/>    
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
                            Time Spent Meditating
                    </Text>
                    } />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }

}

export default BarGraph
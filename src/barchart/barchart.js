import React, { Component } from 'react';
import { BarChart, XAxis, YAxis, Bar } from 'recharts'
const myData = [
    { date: '2020-03-01', minutes: 10 },
    { date: '2020-03-02', minutes: 15 },
    { date: '2020-03-03', minutes: 5 },
    { date: '2020-03-04', minutes: 20 },
]


class BarGraph extends Component {

    render() {
        return (
            <div>

                <BarChart
                    width={750}
                    height={400}
                    data={myData}
                >
                    <YAxis />
                    <XAxis dataKey="date" />
                    <Bar dataKey="minutes" fill="#8884d8" />
                </BarChart>
            </div>
        )
    }

}

export default BarGraph
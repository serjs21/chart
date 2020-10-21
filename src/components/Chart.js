import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const randomColorsRange = ['#3b218f', '#ad67bb', '#4dd1a8', '#dd5142', '#42a654']

const Chart = ({data = [], width = 1200, height = 600}) => {
    const keys = Object.keys(data[0] || []).filter(key => key !== 'name')
    return <LineChart width={width} height={height} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           {keys.map((name, idx) => <Line type="monotone" dataKey={name} key={name} stroke={randomColorsRange[idx]} />)}
          </LineChart>
}

export default Chart;
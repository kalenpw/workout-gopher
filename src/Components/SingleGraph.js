import React from 'react';

import styled from 'styled-components';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { yyyyMmDdToEpoch, epochToYyyyMmDd } from "../Helpers/date";

const GraphWrapper = styled.div`
    border: solid #eee 1px;
    border-radius: 5px;
    padding: 20px;

    & h2 {
        font-size: 2rem;
        text-transform: capitalize;
    }
`;

export default class SingleGraph extends React.Component {

    render() {
        let exercises = this.props.exercises;
        let graphTitle = "";
        let data = [];

        for (let exercise of exercises) {
            graphTitle = exercise.name;

            let date = exercise.date;
            for(let set of exercise.sets) {
                let weight = set.weight;
                data.push({
                    date: yyyyMmDdToEpoch(date),
                    weight: weight
                });
            }
        }

        return (
            <GraphWrapper>
                <h2 className="title">{graphTitle}</h2>
                <ResponsiveContainer minHeight="300px" width="100%">
                    <ScatterChart width={600} height={300} data={data}>
                        <Scatter name="Test" data={data} fill="#888fd8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis  
                            domain={['auto', 'auto']}
                            tickFormatter = {(unixTime) => epochToYyyyMmDd(unixTime)}
                            // tickFormatter = {(unixTime) => epochToYyyyMmDd(unixTime)}
                            name='Date' 
                            type='number' 
                            dataKey={'date'} />
                        <YAxis type='number' dataKey={'weight'} />
                    </ScatterChart>

                </ResponsiveContainer>
            </GraphWrapper>
        );
    }
}
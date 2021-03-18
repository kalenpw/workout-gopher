import React, { PureComponent } from 'react';

import styled from 'styled-components';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Brush } from 'recharts';

import ExerciseStats from './ExerciseStats';

import { yyyyMmDdToEpoch, epochToYyyyMmDd } from "../Helpers/date";

const GraphWrapper = styled.div`
    border-radius: 5px;
    padding: 20px;
    padding-bottom: 50px;
    margin-bottom: 20px;
    max-height: 500px;
    overflow: visible;

    & h2 {
        font-size: 2rem;
        text-transform: capitalize;
    }
`;

export default class SingleGraph extends React.Component {

    render() {
        let exercises = this.props.exercises;
        let graphTitle = "";
        let maxWeight = 0;
        let xTicks = [];
        let yTicks = [];
        let data = [];

        for (let exercise of exercises) {
            graphTitle = exercise.name;
            let date = exercise.date;

            for (let set of exercise.sets) {
                let weight = set.weight;
                if (weight > maxWeight) {
                    maxWeight = weight;
                }
                xTicks.push(yyyyMmDdToEpoch(date));
                yTicks.push(weight);
                data.push({
                    date: yyyyMmDdToEpoch(date),
                    weight: weight
                });
            }
        }

        class CustomizedAxisTick extends PureComponent {
            render() {
                const {
                    x, y, stroke, payload,
                } = this.props;

                return (
                    <g transform={`translate(${x},${y})`}>
                        <text fontSize={10} stroke={stroke} x={0} y={-12} dy={16} textAnchor="end" fill="#666" transform="rotate(-90)">{epochToYyyyMmDd(payload.value)}</text>
                    </g>
                );
            }
        }

        console.log("Hidegrah");
        console.log(this.props.hideGraph);
        let hiddenClass = (this.props.hideGraph) ? "is-hidden" : "";

        return (
            <GraphWrapper className={"column is-full-desktop mb-6" + hiddenClass}>
                <h2 className="title">{graphTitle}</h2>
                <ExerciseStats exercise={this.props.exercises} />
                <ResponsiveContainer minHeight="300px" width="100%">
                    <ScatterChart data={data}>
                        <Scatter name="Test" data={data} fill="#888fd8" />
                        <CartesianGrid stroke="#ccc" />
                        <Brush data={data} tickFormatter={(unixTime) => epochToYyyyMmDd(unixTime)} dataKey='date' height={30} stroke="#8884d8"/>
                        <XAxis
                            height={70}
                            domain={['auto', 'auto']}
                            domain={['dataMin', 'dataMax']}
                            interval={0}
                            tickFormatter={(unixTime) => epochToYyyyMmDd(unixTime)}
                            name='Date'
                            type='number'
                            tick={<CustomizedAxisTick />}
                            ticks={xTicks}
                            dataKey={'date'}
                        />

                        <YAxis
                            type='number'
                            dataKey={'weight'} />
                    </ScatterChart>

                </ResponsiveContainer>
            </GraphWrapper>
        );
    }
}
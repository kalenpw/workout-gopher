import React, { PureComponent } from 'react';

import styled from 'styled-components';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Label } from 'recharts';

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
        let xTicks = [];
        let yTicks = [];
        let data = [];

        for (let exercise of exercises) {
            graphTitle = exercise.name;

            let date = exercise.date;
            for (let set of exercise.sets) {
                let weight = set.weight;
                xTicks.push(yyyyMmDdToEpoch(date));
                yTicks.push(weight);
                data.push({
                    date: yyyyMmDdToEpoch(date),
                    weight: weight
                });
            }
        }

        class CustomizedLabel extends PureComponent {
            render() {
                const {
                    x, y, stroke, value,
                } = this.props;

                return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
            }
        }

        class CustomizedAxisTick extends PureComponent {
            render() {
                const {
                    x, y, stroke, payload,
                } = this.props;

                return (
                    <g transform={`translate(${x},${y})`}>
                        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{epochToYyyyMmDd(payload.value)}</text>
                    </g>
                );
            }
        }

        return (
            <GraphWrapper className="column  is-half-desktop">
                <h2 className="title">{graphTitle}</h2>
                <ResponsiveContainer minHeight="300px" width="100%">
                    <ScatterChart width={600} height={300} data={data}>
                        <Scatter name="Test" data={data} fill="#888fd8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis
                            height={70}
                            domain={['auto', 'auto']}
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
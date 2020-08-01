import React from 'react';

import styled from 'styled-components';

import {appleStocks} from "@vx/vx";

import { yyyyMmDdToEpoch, epochToYyyyMmDd } from "../Helpers/date";

const GraphWrapper = styled.div`
    border: solid #eee 1px;
    border-radius: 5px;
    padding: 20px;

    & h2 {
        border: 5px solid black;
    }
`;

export default class TestGraph extends React.Component {

    render() {
        const width = 750;
        const height = 500;

        const margin = {
            top: 60,
            bottom: 60,
            left: 80,
            right: 80,
        };
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        return (
            <GraphWrapper>
                <h1>in progres</h1>
            </GraphWrapper>
        )

    }
}
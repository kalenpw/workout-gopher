import React from 'react';

import config from "../config";
import { load } from "../Helpers/sheets";

class Graphs extends React.Component {
    componentDidMount() {
        window.gapi.load("client", this.initClient);
    }

    initClient = () => {
        window.gapi.client
            .init({
                apiKey: config.apiKey,
                discoveryDocs: config.discoveryDocs
            })
            .then(() => {
                load(this.onLoad);
            });
    }

    onLoad = (data, error) => {

        if (data) {
            console.log(data);
        } else {
            console.log(error);
        }
    };

    render() {
        return (
            <h1>test</h1>
        )
    }
}

export default Graphs;
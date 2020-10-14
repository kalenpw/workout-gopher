import React from 'react';

import SingleGraph from "Components/SingleGraph"

export default class GraphsWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    getGraphHtml = () => {
        if (this.props.workouts === null) {
            return "";
        }
        console.log(this.props.workouts);
        let graphHtml = [];

        // for ... in returns the key of object  in this case name of exercise
        for (let exerciseName in this.props.workouts) {
            if (exerciseName.includes(this.props.searchText)) {
                graphHtml.push(<SingleGraph exercises={this.props.workouts[exerciseName]} key={exerciseName} />);
            }
        }

        return graphHtml;
    }

    render() {
        console.log("render graph wrapper");
        let graphHtml = this.getGraphHtml();
        return (
            <div className="pt-0 section columns is-multiline is-desktop">
                {graphHtml}
            </div>
        )
    }
}
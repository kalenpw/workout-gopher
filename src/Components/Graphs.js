import React from 'react';

import SingleGraph from "./SingleGraph";

import config from "../config";
import { getSheetData } from "../Helpers/sheets";
import TEST_DATA from "../Helpers/test_data";

// TODO get this info from sheet names
const EXERCISE_GROUPS = [
    "Legs",
    "Arms",
    "Chest",
    "Shoulders",
    "Back",
    "Cardio"
];

const TESTING = true;

export default class Graphs extends React.Component {
    constructor(props) {
        super(props);

        if (TESTING) {
            this.state = {
                exercises: TEST_DATA,
                activeExerciseGroup: "Legs"
            }

        }
        else {
            this.state = {
                exercises: {},
                activeExerciseGroup: ""
            }
        }
    }

    componentDidMount() {
        if (!TESTING) {
            window.gapi.load("client", () => {
                window.gapi.client
                    .init({
                        apiKey: config.apiKey,
                        discoveryDocs: config.discoveryDocs
                    })
                    .then(response => {
                        this.selectExerciseGroup(EXERCISE_GROUPS[0]);
                    })
            });
        }
    }

    selectExerciseGroup = (exerciseGroup) => {
        if (!this.state.exercises[exerciseGroup]) {
            this.getExerciseGroup(exerciseGroup);
        }
        else {
            this.setState({
                activeExerciseGroup: exerciseGroup
            });
        }
    }

    getExerciseGroup = (exerciseGroup) => {
        getSheetData(exerciseGroup, (data) => {
            let newExercises = this.state.exercises;
            newExercises[exerciseGroup] = data;
            this.setState({
                activeExerciseGroup: exerciseGroup,
                exercises: newExercises
            });
        });
    }

    render() {
        console.log(this.state.exercises);
        let tabOptions = EXERCISE_GROUPS.map((exercise) => {
            return (
                <li
                    key={exercise}
                    onClick={() => this.selectExerciseGroup(exercise)}
                    className={(this.state.activeExerciseGroup === exercise) ? "is-active" : ""}>
                    <a>{exercise}</a>
                </li>
            )
        });
        let graphHtml = [];
        let currentExericse = "";
        if (!this.state.exercises || !this.state.exercises[this.state.activeExerciseGroup]) {

        }
        else {
            currentExericse = this.state.exercises[this.state.activeExerciseGroup];
            // console.log(currentExericse);
            for (let exerciseName in currentExericse) {
                // console.log(currentExericse[exerciseName]);
                graphHtml.push(<SingleGraph exercises={currentExericse[exerciseName]} key={exerciseName} />);
            }
        }

        // while testing only show one graph
        // graphHtml = graphHtml[0];


        return (
            <React.Fragment>
                <div className="tabs is-large is-centered">
                    <ul>
                        {tabOptions}
                    </ul>
                </div>
                <div className="section columns is-multiline is-desktop">
                    {graphHtml}
                </div>
            </React.Fragment>
        )
    }
}

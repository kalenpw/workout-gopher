import React from 'react';

import config from "../config";
import { load } from "../Helpers/sheets";

// TODO get this info from sheet names
const EXERCISE_GROUPS = [
    "Legs",
    "Arms",
    "Chest",
    "Shoulders",
    "Back",
    "Cardio"
]

class Graphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: {},
            activeExerciseGroup: EXERCISE_GROUPS[0]
        }
    }

    componentDidMount() {
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

    selectExerciseGroup = (exerciseGroup) => {
        this.setState({
            activeExerciseGroup: exerciseGroup
        });

        if (!this.state.exercises[exerciseGroup]) {
            this.getExerciseGroup(exerciseGroup);
        }
    }

    getExerciseGroup = (exerciseGroup) => {
        load(exerciseGroup, (data) => {
            let newExercises = this.state.exercises;
            newExercises[exerciseGroup] = data;
            this.setState({
                exercises: newExercises
            });
        });
    }

    render() {
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

        return (
            <React.Fragment>
                <div className="tabs is-large is-centered">
                    <ul>
                        {tabOptions}
                    </ul>
                </div>
                <div className="section">
                    <h1>Currently viewing: {this.state.activeExerciseGroup}</h1>
                    <p>{this.state.exercises[this.state.activeExerciseGroup]}</p>
                </div>
            </React.Fragment>
        )
    }
}

export default Graphs;
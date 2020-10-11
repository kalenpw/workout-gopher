import React from 'react';

import SingleGraph from "./SingleGraph";
import SearchBar from "./Searchbar";

import config from "../config";
import { getSheetData } from "../Helpers/sheets";

// TODO get this info from sheet names
const EXERCISE_GROUPS = [
    "Legs",
    "Arms",
    "Chest",
    "Shoulders",
    "Back",
    "Cardio"
];

export default class Graphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: {},
            activeExerciseGroup: "",
            searchText: ""
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

    searchTextUpdated = (value) => {
        this.setState({ searchText: value });
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
                if (exerciseName.includes(this.state.searchText)) {
                    graphHtml.push(<SingleGraph exercises={currentExericse[exerciseName]} key={exerciseName} />);
                }
                // console.log(currentExericse[exerciseName]);
            }
        }

        return (
            <React.Fragment>
                <div className="tabs is-large is-centered">
                    <ul>
                        {tabOptions}
                    </ul>
                </div>
                <SearchBar handleChange={this.searchTextUpdated} />
                <div className="pt-0 section columns is-multiline is-desktop">
                    {graphHtml}
                </div>
            </React.Fragment>
        )
    }
}

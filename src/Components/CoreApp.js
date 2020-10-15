import React from 'react';

import GraphsWrapper from "Components/GraphsWrapper";
import SearchBar from "Components/Searchbar";
import LoadingSpinner from "Components/LoadingSpinner";

import config from "../config";
import { getSheetData } from "Helpers/sheets";

// TODO get this info from sheet names
const EXERCISE_GROUPS = [
    "Legs",
    "Arms",
    "Chest",
    "Shoulders",
    "Back",
    "Cardio"
];

export default class CoreApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: {},
            activeExerciseGroup: "",
            searchText: "",
            isLoading: true,
            typingTimeout: 0,
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
        this.setState({ isLoading: true });
        if (!this.state.exercises[exerciseGroup]) {
            this.getExerciseGroup(exerciseGroup);
        }
        else {
            this.setState({
                activeExerciseGroup: exerciseGroup,
                isLoading: false
            });
        }
    }

    getExerciseGroup = (exerciseGroup) => {
        getSheetData(exerciseGroup, (data) => {
            let newExercises = this.state.exercises;
            newExercises[exerciseGroup] = data;
            this.setState({
                activeExerciseGroup: exerciseGroup,
                exercises: newExercises,
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
                    <a href={'#' + exercise}>{exercise}</a>
                </li>
            )
        });
        if (this.state.isLoading) {
            this.state.isLoading = false;
            return (
                <React.Fragment>
                    <div className="tabs is-large is-centered">
                        <ul>
                            {tabOptions}
                        </ul>
                    </div>
                    <SearchBar handleChange={this.searchTextUpdated} />
                    <LoadingSpinner />
                </React.Fragment>
            );
        }
        let currentWorkouts = this.state.exercises[this.state.activeExerciseGroup];
        let graphHtml = "";
        if (currentWorkouts) {
            graphHtml = <GraphsWrapper searchText={this.state.searchText} workouts={currentWorkouts} />;
        }
        else {
            graphHtml = <LoadingSpinner />;
        }

        return (
            <React.Fragment>
                <div className="tabs is-large is-centered">
                    <ul>
                        {tabOptions}
                    </ul>
                </div>
                <SearchBar handleChange={this.searchTextUpdated} />
                {graphHtml}
            </React.Fragment>
        )
    }
}

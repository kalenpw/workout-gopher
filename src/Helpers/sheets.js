import config from "../config";

import Exercise from "../Models/Exercise";
import Set from "../Models/Set";

import { isDate } from "./regex";

export function getSheetData(sheetName, callback) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: config.sheetId,
                range: sheetName + "!A3:T"
            })
            .then(
                response => {
                    const data = response.result.values;
                    let formattedData = parseData(data);
                    callback(formattedData);
                }
            );
    });
}

function parseData(data) {
    let dateIndex = 0;
    let exerciseNameIndex = 1;
    let currentExercise = null;
    let currentDate = null;

    let exerciseDict = {};

    for(let row of data) {
        if (row.length === 0) {
            continue;
        }

        if (isDate(row[dateIndex])) {
            currentDate = row[dateIndex];
        }

        let exerciseName = row[exerciseNameIndex].trim().toLowerCase();
        currentExercise = new Exercise(exerciseName, currentDate);
        let sets = getSetsFromRow(row);
        currentExercise.sets = sets;

        if (!exerciseDict[exerciseName]) {
            exerciseDict[exerciseName] = []
        }
        exerciseDict[exerciseName].push(currentExercise);
    }
    return exerciseDict;
}

function getSetsFromRow(row) {
    if (row.length === 0) {
        return;
    }
    const WEIGHT_INDEX = 0;
    const REPS_INDEX = 1;
    const SET_START_INDEX = 2;
    let setObjects = [];
    let sets = row.slice(SET_START_INDEX);
    for (let i = 0; i < sets.length; i++) {
        let splitAmounts = sets[i].split("x");
        let weight = splitAmounts[WEIGHT_INDEX];
        let reps = splitAmounts[REPS_INDEX];
        setObjects.push(new Set(Number(weight), Number(reps)));
    }
    return setObjects;
}
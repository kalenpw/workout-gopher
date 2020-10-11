import config from "../config";

import Exercise from "../Models/Exercise";
import Set from "../Models/Set";

import { isDate } from "./regex";

declare const window: any;

export function getSheetData(sheetName: string, callback: (n: any) => any) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: config.sheetId,
                range: sheetName + "!A3:T"
            })
            .then(
                // @ts-ignore
                response => {
                    const data = response.result.values;
                    let formattedData = parseData(data);
                    callback(formattedData);
                }
            );
    });
}

// @ts-ignore
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

        let exerciseName: string = row[exerciseNameIndex].trim().toLowerCase();
        currentExercise = new Exercise(exerciseName, currentDate);
        let sets: Set[] = getSetsFromRow(row);
        currentExercise.sets = sets;
        // @ts-ignore
        if (!exerciseDict[exerciseName]) {
            // @ts-ignore
            exerciseDict[exerciseName] = []
        }
        // @ts-ignore
        exerciseDict[exerciseName].push(currentExercise);
    }
    return exerciseDict;
}

function getSetsFromRow(row: Array<any>): Set[] {
    if (row.length === 0) {
        // @ts-ignore
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
        // setObjects.push(new Set(weight, reps));
    }
    return setObjects;
}
import React from 'react';

import { estimateOneRepMax } from "Helpers/stats";
import { formatSet } from "Helpers/formatters";

type ExerciseStatsProps = {
    exercise: any;
}

export default function ExerciseStats(props: ExerciseStatsProps) {
    let exercise = props.exercise;

    // -1 since on some exercies 0 could be top
    // eg pushups 
    let maxWeight = -1;
    let oneRepMax = -1;
    let oneRepMaxSet;

    let prDisplay = "";

    for (let day of exercise) {
        for (let set of day.sets) {
            let reps = set.reps;
            let weight = set.weight;
            let potentialOneRepMax = estimateOneRepMax(weight, reps);
            if (weight > maxWeight) {
                maxWeight = weight;
                prDisplay = `${weight}x${reps}`;
            }
            if (potentialOneRepMax > oneRepMax) {
                oneRepMax = potentialOneRepMax;
                oneRepMaxSet = set;
            }
        }
    }

    // if the max lifted weight < 15 
    // we assume that is a machine weight 
    let isFreeWeight: boolean = (maxWeight > 15);

    // let oneRepMaxDisplay = `${oneRepMax} (based off ${oneRepMaxSet.weight}x${oneRepMaxSet.reps})`;
    let oneRepMaxSetDispaly = formatSet(oneRepMaxSet);
    let oneRepMaxDisplay = `${oneRepMax} (based off ${oneRepMaxSetDispaly})`;

    if (isFreeWeight) {
    }

    return (
        <div>
            <p>PR: {prDisplay}</p>
            <p>Estimated 1RM: {oneRepMaxDisplay}</p>
        </div>
    )
}


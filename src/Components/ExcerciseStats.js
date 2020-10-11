import React from 'react';

export default function ExcerciseStats(props) {
    let exercise = props.exercise;

    let maxWeight = 0;

    for (let day of exercise) {
        for (let set of day.sets) {
            let weight = set.weight;
            if (weight > maxWeight) {
                maxWeight = weight;
            }
        }
    }

    return (
        <div>
            <p>Max weight: {maxWeight}</p>
        </div>
    )
}


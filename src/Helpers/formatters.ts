import Set from "Models/Set";

/**
 * returns string of WEIGHTxREPS
 * @param set Set object with weight and reps
 */
export function formatSet(set: Set): string {
    if (set) {

        return `${set.weight}x${set.reps}`;
    }
    return "NULL";
}
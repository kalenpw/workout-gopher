/**
 * Estimate 1rm rounded to nearest pound using Epley formula 
 * https://en.wikipedia.org/wiki/One-repetition_maximum#Epley_formula
 * @param weight - weight lifted for x reps
 * @param reps - reps done of x weight
 */
export function estimateOneRepMax(weight: number, reps: number): number {
    return Math.round(weight * (1 + (reps / 30)));
}
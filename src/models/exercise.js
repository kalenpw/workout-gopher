import Set from "./set";

export default class Exercise {
    constructor(name, date) {
        this.name = name;
        this.date = date;
        this.sets = [];
    }

    addSet(weight, reps) {
        this.sets.push(new Set(weight, reps))
    }
}
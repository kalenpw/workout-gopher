
/**
 * Formats the name of an exercise to be used as an html ID for ApexCharts
 * @param {String} name - exercise name
 * @returns 
 */
export function nameFormattedForID(name) {
    name = name.replace(/\W/g, '')
    return name.replaceAll(' ', '-');
}
/**
 * Returns true/false if string is date of format 2020-07-01
 * @param {string} value 
 */
export function isDate(value) {
    if (!value) {
        return false;
    }
    const dateRegex = /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/g;
    return Boolean(value.match(dateRegex));
}

/**
 * Returns true/false if string is set of format WEIGHTxAMOUNT ie 100x10
 * @param {string} value 
 */
export function isSet(value) {
    if (!value) {
        return false;
    }
    const setRegex = /[0-9]+x[0-9]+/g;
    return Boolean(value.match(setRegex));
}
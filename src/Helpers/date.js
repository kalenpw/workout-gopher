/**
 * Converts a string of type 'yyyy-mm-dd' to date object
 * @param {string} dateString - yyyy-mm-dd date
 */
export function yyyyMmDdToEpoch(dateString) {
    let utcSeconds = Date.parse(dateString);
    let mstOffset = 6 * 60 * 60 * 1000;
    let mstSeconds = utcSeconds + mstOffset;
    return mstSeconds;
}

export function epochToYyyyMmDd(timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}-${pad(month, 2)}-${pad(day, 2)}`;
}

function pad(n, width = 3, z = 0) { 
    return (String(z).repeat(width) + String(n)).slice(String(n).length) 
}
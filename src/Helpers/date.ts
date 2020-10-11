/**
 * Converts a string of type 'yyyy-mm-dd' to date object
 * @param {string} dateString - yyyy-mm-dd date
 */
export function yyyyMmDdToEpoch(dateString: string): number {
    let utcSeconds: number = Date.parse(dateString);
    // offset for mountain time since Date.parse returns utc
    let mstOffset: number = 6 * 60 * 60 * 1000;
    let mstSeconds: number = utcSeconds + mstOffset;
    return mstSeconds;
}

export function epochToYyyyMmDd(timestamp: number): string {
    let date: Date = new Date(timestamp);
    let year: number = date.getFullYear();
    let month: number = date.getMonth() + 1;
    let day: number = date.getDate();

    return `${year}-${pad(month, 2)}-${pad(day, 2)}`;
}

function pad(n: number, width = 3, z = 0) {
    return (String(z).repeat(width) + String(n)).slice(String(n).length)
}
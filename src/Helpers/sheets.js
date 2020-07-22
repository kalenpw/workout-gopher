import config from "../config";

import Exercise from "../Models/Exercise";

export function load(sheetName, callback) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: config.sheetId,
                range: sheetName + "!A3:T"
            })
            .then(
                response => {
                    const data = response.result.values;
                    let formattedData = parseData(data);
                    callback(formattedData);
                }
            );
    });
}

function parseData(data) {
    // console.log(data);
    return data;
}
import config from "../config";

export function load(callback) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: config.sheetId,
                range: "Legs!A3:T"
            })
            .then(
                response => {
                    const data = response.result.values;
                    console.log(data);
                },
                response => {
                    callback(false, response.result.error);
                }
            );
    });
}
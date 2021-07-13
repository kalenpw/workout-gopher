export default {
    apiKey: import.meta.env["VITE_GOOGLE_API_KEY"],
    discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4"
    ],
    sheetId: import.meta.env["VITE_SHEET_ID"]
}
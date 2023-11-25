export function exportDataChartToCsv (/** @type { string } */ filename, 
                                      /** @type { number[] } */ data, 
                                      /** @type { string[] } */ labels) {
    let json = convertArraysToJson(data, labels);
    let csv = convertToCSV(json);
    csv = csv.replace(/,/g, ";");
    // For decimal value labels.
    csv = csv.replace(/\./g, ",");
    download_csv(csv, filename);
}

function convertArraysToJson(/** @type { number[] } */ data, /** @type { string[] } */ labels) {
    let obj = {};
    let result = [];
    for (let i = 0; i < labels.length; i++)
        // @ts-ignore   
        obj[labels[i]] = data[i];
    result.push(obj);
    return result;
}

function convertToCSV(/** @type {any[]}*/ arr) {
    const array = [Object.keys(arr[0])].concat(arr);
    return array.map(it => { return Object.values(it).toString() }).join('\n')
}

function download_csv(/** @type { string } */ csv, /** @type { string } */ filename) {
    let csvFile;
    let downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

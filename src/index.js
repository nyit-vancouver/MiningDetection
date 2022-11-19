const url = require('url');
const fs = require('fs');
const path = require('path');
const scan = require('./scan');

// check existence and load miners-list.json
let minersList;
const minersListFilePath = path.resolve(__dirname, 'miners-list/miners-list.json');

if (!fs.existsSync(minersListFilePath)) {
    console.log('Miners list JSON doesn\'t exist. To fetch it run: \nnpm run update-miners-list');
    process.exit(1);
} else {
    minersList = JSON.parse(fs.readFileSync(minersListFilePath));
}

// check existence and websites-to-scan.txt
let websitesToScan;
const websitesToScanFilePath = path.resolve(__dirname, 'websites-to-scan.txt');

if (!fs.existsSync(websitesToScanFilePath)) {
    console.log('Please create websites-to-scan.txt file and populate it with websites to scan. One per line.');
    process.exit(1);
} else {
    const fileData = fs.readFileSync(websitesToScanFilePath).toString();
    if (fileData.length) {
        websitesToScan = fileData.split('\n').filter(Boolean);
    }
}

async function main() {
    for (let url of websitesToScan) {
        await scan(url, minersList);
    }
}

main();

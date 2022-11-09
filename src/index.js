const url = require('url');
const puppeteer = require('puppeteer');
const fs = require('fs');

const scanTimeoutSeconds = Number(process.env.npm_config_timeout) || Number(process.env.npm_package_config_scanTimeoutSeconds);
const urlToScan = process.env.npm_config_url;

if (!urlToScan) {
    console.log('"url" parameter has to be provided. Example: \nnpm run start --url=https://google.com');
    console.log('');
    console.log('For more information run \nnpm run help');
    console.log('');
    process.exit(1);
} else {
    // check that URL is valid
    try {
        new URL(urlToScan);
    } catch (e) {
        console.log(`Cannot open "${urlToScan}". URL is invalid. Make sure URL contains protocol prefix like "http://"`);
        process.exit(1);
    }
}

// check existance and load miners-list.json
let minersList;
const minersListFilePath = `${__dirname}/miners-list/miners-list.json`;

if (!fs.existsSync(minersListFilePath)) {
    console.log('Miners list JSON doesn\'t exist. To fetch it run: \nnpm run update-miners-list');
    process.exit(1);
} else {
    minersList = JSON.parse(fs.readFileSync(minersListFilePath));
}

async function main() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1024,
        height: 768,
    });

    const scannedUrls = new Set();
    let requestError;

    // register events
    page.on('request', response => {
        const responseUrl = url.parse(response.url(), true);
        if (responseUrl.protocol.includes('wss')) {
            console.log(responseUrl);
        }
        scannedUrls.add(responseUrl.host);
    });

    page.on('error', async (error) => {
        requestError = error;
        await browser.close();
    });

    browser.on('disconnected', () => {
        if (requestError) {
            console.error(requestError);
        } else {
            const miningUrlsDetected = new Set();
            for (let miner of minersList) {
                for (let url of scannedUrls) {
                    if (url === miner) {
                        miningUrlsDetected.add(miner);
                    }
                }
            }

            console.log('Amount of domains scanned: ', scannedUrls.size);
            console.log(scannedUrls);
            console.log('');

            if (miningUrlsDetected.size) {
                console.log('================================================');
                console.log('Report:');
                console.log('!!! MINING DETECTED !!! ');
                for (let minerUrl of miningUrlsDetected) {
                    console.log('Tested URL: ' + minerUrl);
                }
                console.log('=================================================');
            } else {
                console.log('================================================');
                console.log('Report:');
                console.log('Mining is not detected');
                console.log('=================================================');
            }
        }
    });

    // open website
    console.log('Loading URL. Start scanning.');
    const response = await page.goto(urlToScan);

    // save website screenshot
    await page.screenshot({
        path: `./screenshots/${new URL(urlToScan).host}.png`,
        type: 'png',
    });

    // if website returns error, log it and close session
    if (response.status() !== 200) {
        requestError = response.status();
        await browser.close();
        return;
    }

    let waitingCounter = 0;
    const waitingTimer = setInterval(async () => {
        waitingCounter++;
        if (waitingCounter === scanTimeoutSeconds) {
            clearInterval(waitingTimer);
            console.log('Scanning is finished by timeout');
            await browser.close();
        } else {
            console.log('Waiting for new requests...');
        }
    }, 1000);
}

main();

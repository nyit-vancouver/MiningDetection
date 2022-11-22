const url = require('url');
const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');

const scanTimeoutSeconds = Number(process.env.npm_config_timeout) || Number(process.env.npm_package_config_scanTimeoutSeconds);

module.exports = exports = async (urlToScan, minersList) => {
    try {
        new URL(urlToScan);
    } catch (e) {
        console.log(`URL is invalid. Make sure URL contains protocol prefix like "http://"`);
        return;
    }

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

            if (miningUrlsDetected.size) {

                console.log(chalk.red('Report:', urlToScan));
                console.log(chalk.red('!!! MINING IS DETECTED !!! '));
                for (let minerUrl of miningUrlsDetected) {
                    console.log(chalk.red('Tested URL: ' + minerUrl));
                }
                console.log('==============================================================');
            } else {

                console.log(chalk.green('Report:', urlToScan));
                console.log(chalk.green('Mining is not detected'));
                console.log('==============================================================');
            }
        }
    });

    // open website
    console.log('Loading URL %s. Start scanning.', urlToScan);
    const response = await page.goto(urlToScan, {
        timeout: 5000, // milliseconds
    });

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
    return new Promise((accept) => {
        const waitingTimer = setInterval(async () => {
            waitingCounter++;
            if (waitingCounter === scanTimeoutSeconds) {
                clearInterval(waitingTimer);
                await browser.close();
                accept();
            }
        }, 1000);
    });
}

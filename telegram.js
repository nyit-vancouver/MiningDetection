"use strict";
const { Telegraf } = require("telegraf");
const fetch = require("node-fetch")
const fs = require("fs");
const path = require('path');
const { spawn } = require('node:child_process');

const bot = new Telegraf('5830615146:AAEcM63bJ-jx14-ar7I7Jv9-km9t2A9V578');
const websitesToScanFilePath = path.resolve(__dirname, 'src/websites-to-scan.txt');

bot.command("start", (ctx) => {
    const notification = '\u{1F44B}';
    bot.telegram.sendMessage(
        ctx.chat.id,
        (notification + "Hello from our Mining Detection Bot.\nPlease enter websites that you want to check.\nFor example: http://www.nyit.edu")
    );
});
bot.hears(/([http])\w{0,4}/, async (ctx) => {
    let my_urls = ctx.message.text.substring(0);
    const array = my_urls.split(", ");
    //ctx.reply("Started to test " + my_urls);

    const fs = require('fs');
    const writeStream = fs.createWriteStream(websitesToScanFilePath);
    const pathName = writeStream.path;


// write each value of the array on the file breaking line
    array.forEach(value => writeStream.write(`${value}\n`));

// the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
        console.log(`wrote all the array data to file ${pathName}`);
    });

// handle the errors on the write process
    writeStream.on('error', (err) => {
        console.error(`There is an error writing the file ${pathName} => ${err}`)
    });

// close the stream
    writeStream.end();
    const scan = spawn('npm', ['run', 'scan']);
    scan.stdout.on('data', (data) => {
        //console.log(`${data}`);
        bot.telegram.sendMessage(
            ctx.chat.id,
            `${data}`
        );
    });

    scan.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    scan.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});
bot.launch();

const puppeteer = require('puppeteer');
const config = require('./config/index.js');
const fs = require('fs');



var startTime, endTime;
startTime = new Date();

/** return time elapsed */
function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    var seconds = Math.round(timeDiff);
    // console.log(seconds + " seconds");
    return "-" + seconds + " seconds";
}

async function run() {
    const browser = await puppeteer.launch({
        headless: config.headless,
        args: ["--ash-host-window-bounds=1920x1080", "--window-size=1920,1080", "--window-position=0,0"]
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 })

    console.log("navigating to webpage")

    await page.goto('https://www.packtpub.com/packt/offers/free-learning');

    console.log("entering credentials")

    await page.evaluate((config) => {
        document.querySelector("a.login-popup").click()
        document.querySelector("div.account-bar-form-left input#email").value = config.email
        document.querySelector("div.account-bar-form-left input#password").value = config.pw
    }, config)

    console.log("logging in")

    await page.waitFor(500);
    await page.evaluate(() => {
        document.querySelector("#edit-submit-1").click()
    })

    console.log("claiming book")

    await page.waitFor(500);
    await page.evaluate(() => {
        document.querySelector("#fl-claim-btn").click()
    })

}

run();
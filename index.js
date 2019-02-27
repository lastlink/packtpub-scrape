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
        // slowMo:10,

    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 })

    console.log("navigating to webpage")

    await page.goto('https://www.packtpub.com/login');

    console.log("entering credentials")

    await page.evaluate((config) => {
        // document.querySelector("a.login-popup").click()
        document.querySelector("input[name='name']").value = config.email
        document.querySelector("input[name='pass']").value = config.pw

        // document.querySelector("input[name='email']").value = config.email
        // document.querySelector("input[name='password']").value = config.pw
    }, config)

    console.log("logging in")

    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.waitFor(2000);

    await page.click("#edit-post-form");
    // to possible urls
    // await page.click(`div.full-page__child button[type="submit"]`);
    
    // need to handle hidden captcha eventually
    // VM898 recaptcha__en.js:506 Uncaught Error: reCAPTCHA placeholder element must be an element or id
    // at Object.h4 [as render] (VM898 recaptcha__en.js:506)
    // at Object.onLoadRecaptcha (952c3ff98a6acdc36497d839e31aa57c.js:1334)
    // at onLoadRecaptcha (free-learning:1069)
    // at Z_ (VM898 recaptcha__en.js:510)
    // at eK (VM898 recaptcha__en.js:508)
    // at VM898 recaptcha__en.js:517
    // at VM898 recaptcha__en.js:537


    // await page.evaluate(() => {
    //     document.querySelector("input#edit-submit-1").click()
    // })

    console.log("claiming book")
    await page.waitFor(2000);


    await page.goto('https://www.packtpub.com/packt/offers/free-learning');

    // await page.waitFor(2000);

    // await page.waitFor(500);
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // will fail b/c of recaptcha manually click instead
    // await page.evaluate(() => {
    //     document.querySelector("#fl-claim-btn").click()
    // })

}

run();
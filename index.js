const puppeteer = require('puppeteer');
const creds = require('./config/creds.js');
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
		headless: MAINCONFIG.headless,
		args: ["--ash-host-window-bounds=1920x1080", "--window-size=1920,1048", "--window-position=0,0"]
	});

	const page = await browser.newPage();

    console.log("navigating to webpage")

    await page.goto('https://www.packtpub.com/packt/offers/free-learning');
}
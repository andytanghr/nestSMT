const puppeteer = require('puppeteer');
const HTMLParser = require('node-html-parser');
// import { parse } from 'node-html-parser';

async function scraper(settings) {
  const startDate = await settings.startDate;
  const endDate = await settings.endDate;

  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();
  await page.goto('https://www.smartmetertexas.com/smt/tPartyAgreementsLogin/public/smt_login.jsp', { waitUntil: 'load'} );

  // const skip = await page.$('.skip');
  // console.log(skip.innerHTML);
  // // const getSkip = await page.evaluate( () => document.querySelector('.skip'));
  // const getSkip = await HTMLParser.parse( page.content() ).querySelector('.skip');
  // console.log(getSkip.innerHTML);

  await page.type('#username', settings.username);
  await page.type('#txtPassword', settings.txtpassword);
  await page.keyboard.press('Enter');

  await page.waitForNavigation( {waitUntil: 'load'} );

  await page.click( ' input[name="viewUsage_startDate"] ', {clickCount: 3} );
  await page.keyboard.press('Backspace');
  await page.type( ' input[name="viewUsage_startDate"] ', startDate );
  await page.keyboard.press('Tab');
  await page.type( ' input[name="viewUsage_endDate"] ', startDate );
  await page.select('select', 'DAILY' );

  await page.waitForSelector('.clearfloat');
  
  return await page.content();
};

module.exports = scraper;
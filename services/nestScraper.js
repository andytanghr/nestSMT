const puppeteer = require('puppeteer');

const nestScraper = async credentials => {
  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();
  
  await page.goto(`https://home.nest.com`, { waitUntil: 'load'} );
  // await page.goto(`file:///Users/anDreas/Dropbox/nestThermHistoryTestData.html`, { waitUntil: 'load'} );
// /**
  // await page.click('#email');
  await page.type('#email', credentials.nestEmail); // NEST USERNAME
  // await page.keyboard.press('Tab');
  await page.type('#pass', credentials.nestPassword); // NEST PASSWORD
  await page.keyboard.press('Enter');

  await page.waitForNavigation( { waitUntil: 'load'} );

  await page.click('.puck-icon');
  // <a href="/thermostat/09AA01AC441614VE"><div class="puck-icon styles--puckContainer_K7P"><div class="styles--content_2Pp styles--idle_2Tf"><div class="styles--container_1vV styles--mode-cool_19e"><div class="styles--tempContainer_37J">80</div></div></div></div><div class="puck-label" aria-hidden="true"><h1>Living Room</h1><h2 class="puck-status-text" aria-hidden="true"></h2></div></a>
  // page.waitForNavigation( { waitUntil: 'load'} ); // OR .waitForSelector('[data-test="thermozilla-history-button"]');
  await page.waitForSelector('[data-test="thermozilla-history-button"]');
  await page.click('[data-test="thermozilla-history-button"]');
  // <button data-test="thermozilla-history-button" class="button-styles--toolbarButton_3e2"><div class="button-styles--toolbarIcon_1eR shared-button-styles--comfortHistoryIcon_3BP"></div>HISTORY</button>
//  */
  await page.waitForSelector('.history-view');
  const tableHistory = await page.$('table');
  return await tableHistory;
// ('.table')

  


}

module.exports = nestScraper;
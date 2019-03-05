const puppeteer = require('puppeteer');

async function scraper() {
  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();
  await page.goto('https://www.smartmetertexas.com/smt/tPartyAgreementsLogin/public/smt_login.jsp', { waitUntil: 'networkidle2'});
  // await page.type('#username', process.env.USERNAME);
  // await page.type('#txtPassword', process.env.TXTPASSWORD);
  
  await console.log('scraper js invoked');


/*
  await Promise.all([
    
    // page.click(' select[name="reportType"] ');
    // page.waitForNavigation( {waitUntil: 'networkidle0' });

    // page.click(' option[value="DAILY"] ');
    // page.waitForNavigation( {waitUntil: 'networkidle0' });
    page.keyboard.press('Enter'),
    page.waitForNavigation( {waitUntil: 'networkidle0'} ),

    page.select( ' select[name="reportType"]', 'DAILY' ),
    page.waitForNavigation( {waitUntil: 'networkidle0' } ),

    page.click( ' input[name="viewUsage_startDate"] ', {clickCount: 3} ),
    keyboard.press( 'Backspace'),
    page.type( ' input[name="viewUsage_startDate"] ', '12/01/2018' ),  

    page.click( ' input[name="viewUsage_endDate"] ', {clickCount: 3} ),
    keyboard.press( 'Backspace'),
    page.type( ' input[name="viewUsage_startDate"] ', '12/01/2018' ),

    page.click( ' input[name="viewusage_but_updaterpt] ' ),
    page.waitForNavigation( {waitUntil: 'networkidle0' }),

    // const energyUsage = 
    page.evaluate( () => {
      const date = document.querySelector(' span[name="ViewDailyUsage_RowSet_Row_column6"] ').innerHTML;
      const startRead = document.querySelector(' span[name="ViewDailyUsage_RowSet_Row_column7"] ').innerHTML;
      const endRead = document.querySelector(' span[name="ViewDailyUsage_RowSet_Row_column6"] ').innerHTML;
      const consumption = document.querySelector(' span[name="ViewDailyUsage_RowSet_Row_column6"] ').innerHTML;

      return {
        'date': new Date(date),
        'startRead': Number(startRead),
        'endRead': Number(endRead),
        'consumption': Number(consumption)
      };
    }),




    
  ]);
*/



  await page.evaluate( () => {
    let testText = document.querySelectorAll('.access')[0].innerText;
    // console.log(testText);
    return { 'testProp': document.querySelectorAll('.access')[0].innerHTML };
  });

  // browser.close();
};

module.exports = scraper;
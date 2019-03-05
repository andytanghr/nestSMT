const puppeteer = require('puppeteer');

async function scraper(settings) {
  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();
  await page.goto('https://www.smartmetertexas.com/smt/tPartyAgreementsLogin/public/smt_login.jsp', { waitUntil: 'load'});
  
  // await page.waitFor(2500);
  
settings.startDate = '12/01/2018';
settings.endDate = '12/31/2018';
  
  // await console.log('scraper js invoked');
  // await console.log(credentials.user + ' on the scraper js');

  // const testText = await page.evaluate( () => document.querySelectorAll('.access')[0].innerText );

  const startDate = settings.startDate;
  const endDate = settings.endDate;

const daysDiff = (endDate - startDate) / 1000 / 3600 / 24; 



  await page.type('#username', process.env.USERNAME);
  await page.type('#txtPassword', process.env.TXTPASSWORD);

  await page.keyboard.press('Enter');
  // await page.click('div#button-four2');
  await page.waitForNavigation( {waitUntil: 'load'} );

  await page.click( ' input[name="viewUsage_startDate"] ', {clickCount: 3} );
  await page.keyboard.press('Backspace');
  await page.type( ' input[name="viewUsage_startDate"] ', startDate );
  await page.keyboard.press('Tab');
  await page.type( ' input[name="viewUsage_endDate"] ', endDate );

  await page.select('select', 'DAILY' );

  // await page.waitForNavigation( {waitUntil: 'load'} );



console.log('before usage is selected');
// const energyUsage = await page.$('#td_print_end > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1) > span:nth-child(1) > table:nth-child(1) > tbody:nth-child(1)').innerText;
    // console.log(energyUsage);
    
let dates = await page.$$(' span[name="ViewDailyUsage_RowSet_Row_column6"] '); // this assigns a node list
dates = await Array.from(dates).map( item => item.innerHTML ); // now converted to array 

let startReads = await page.$$(' span[name="ViewDailyUsage_RowSet_Row_column7"] ');;
startReads = await Array.from(startReads).map( item => parseFloat(item.innerHTML) );;

let endReads = await page.$$(' span[name="ViewDailyUsage_RowSet_Row_column8"] ');;
endReads = await Array.from(endReads).map( item => parseFloat(item.innerHTML) );;

let usages = await page.$$(' span[name="ViewDailyUsage_RowSet_Row_column9"] ');;
usages = await Array.from(usages).map( item => parseFloat(item.innerHTML) );

let energyUsage = await dates.map( (date, index) => (
  {
    'date': date,
    'startRead': startReads[index],
    'endRead': endReads[index],
    'usage': usages[index]
  }
));

    // await page.evaluate( () => {
      
    //   let = []
      
      // for (let i = 0; i < daysDiff; i++) {
      //   let date = document.querySelector(' span[name="ViewDailyUsage_RowSet_Row_column6"] ').innerHTML;
      //   let startRead = document.querySelector(' span[name="ViewDailyUsage_RowSet_Row_column7"] ').innerHTML;
      //   let endRead = document.querySelector(' span[name="ViewDailyUsage_RowSet_Row_column6"] ').innerHTML;
      //   let consumption = document.querySelector(' span[name="ViewDailyUsage_RowSet_Row_column6"] ').innerHTML;
      // }


      // return {
      //   'date': new Date(date),
      //   'startRead': Number(startRead),
      //   'endRead': Number(endRead),
      //   'consumption': Number(consumption)
      // };






  await browser.close();
  // console.log( { 'scraperJson': '24' } );

  return { energyUsage };
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



    page.click( ' input[name="viewUsage_endDate"] ', {clickCount: 3} ),
    keyboard.press( 'Backspace'),
    page.type( ' input[name="viewUsage_startDate"] ', '12/01/2018' ),

    page.click( ' input[name="viewusage_but_updaterpt] ' ),
    page.waitForNavigation( {waitUntil: 'networkidle0' }),

    
    }),




    
  ]);
*/




};

module.exports = scraper;
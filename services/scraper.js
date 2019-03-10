
const puppeteer = require('puppeteer');
// const HTMLParser = require('node-html-parser');
// import { parse } from 'node-html-parser';

async function scraper(settings) {
  const startDate = await settings.startDate;
  const endDate = await settings.endDate;

  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();
  // await page.goto('file:///Users/anDreas/Dropbox/SMTportalTestData.htm', { waitUntil: 'load'} );
  // await page.goto('file:///Users/anDreas/Dropbox/Smart%20Meter%20Texas%20-%20Welcome.html' , { waitUntil: 'load'} );
  await page.goto('https://www.smartmetertexas.com/smt/tPartyAgreementsLogin/public/smt_login.jsp', { waitUntil: 'load'} );
  
  // await page.waitFor(5000);

  // testing  
  // await console.log('scraper js invoked');
  // await console.log(credentials.user + ' on the scraper js');
  // const testTextEarlier = await page.evaluate( () => document.querySelectorAll('.access')[0].innerText );


  // const daysDiff = (endDate - startDate) / 1000 / 3600 / 24; 


  // disabled to test parsing for energy data
  await page.type('#username', settings.username);
  await page.type('#txtPassword', settings.txtpassword);
  // await page.waitFor(2000);

  await page.keyboard.press('Enter');
  // await page.click('.button-four2');
  await page.waitForNavigation( {waitUntil: 'load'} );
  // await page.waitFor(2000);

  await page.click( ' input[name="viewUsage_startDate"] ', {clickCount: 3} );
  await page.keyboard.press('Backspace');
  await page.type( ' input[name="viewUsage_startDate"] ', startDate );
  await page.keyboard.press('Tab');
  await page.type( ' input[name="viewUsage_endDate"] ', startDate );
  await page.select('select', 'DAILY' );

  await page.waitForSelector('.clearfloat');
  // await page.waitFor(2000);





  // await page.waitForNavigation( {waitUntil: 'load'} );




// await console.log('before usage is selected');

// let bodyHTML = await page.evaluate( () => document.body.innerHTML );
// console.log(bodyHTML)
// const root = await HTMLParser.parse(bodyHTML);
// return page.evaluate( () => document.body.innerHTML );
  // await browser.close();
  return await page.content();




// const datesNode = root.querySelectorAll('span[name="ViewDailyUsage_RowSet_Row_column6"]');
// const datesArray = Array.from(datesNode);
// await console.log( datesArray );

// await console.log( root.querySelector('#Image_overlay_text').innerHTML );
// let nodeList = root.querySelectorAll('.access');
// let arrayText = nodeList.map( item => item.structuredText );
// await console.log( arrayText );

// const root = await HTMLParser.parse( page.evaluate( () => document.querySelectorAll('.access')[0] ));
// await console.log( root.toString() );



// await page.waitFor('.clearfloat')
// await page.waitFor('#Image_overlay_text')
// .then( console.log('page loaded') )
// .then( () => {
//   return page.evaluate( () => document.querySelectorAll('.skip')[0].textContent ) 
// })
// .then( skipFirst => console.log(skipFirst) )
// .then( () => {
//   let overlayText = page.$('#Image_overlay_text').innerText;
//   return overlayText;
// })
// .then( () => {
//   let nodeList = page.evaluate( () => document.querySelectorAll('.skip') );
//   // return Array.from(nodeList).length;
//   console.log(nodeList[0].textContent);
// })
// .then( () => {
//   let skipSecond = page.$('.skip').innerText;
//   return skipSecond;
// })
// .then( testText => console.log( testText ) )
// .then( console.log(testTextEarlier) )
// .then( console.log( 'done with query') );
// const testText = await page.evaluate( () => document.querySelector('span[name="ViewDailyUsage_RowSet_Row_column6"]') );
// const testText = await page.waitForSelector( () => document.querySelectorAll('span[name="ViewDailyUsage_RowSet_Row_column6"]') );

// await console.log(testText.innerText);

// const energyUsage = await page.$('#td_print_end > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1) > span:nth-child(1) > table:nth-child(1) > tbody:nth-child(1)').innerText;
    // console.log(energyUsage);
    
// const datesNodeList = await page.$(' [name="ViewDailyUsage_RowSet_Row_column6"] '); // this assigns a node list
// const datesNodeList = await page.evaluate( () => document.querySelectorAll(' span[name="ViewDailyUsage_RowSet_Row_column6"] ') );

// await console.log(datesNodeList[0].innerText);
// const datesArray = await Array.from(datesNodeList).map( item => item.innerText ); // now converted to array 
// await console.log(datesArray);

// const startReadsNodeList = await page.$$(' span[name="ViewDailyUsage_RowSet_Row_column7"] ');;
// const startReadsArray = await Array.from(startReadsNodeList).map( item => parseFloat(item.innerText) );;

// const endReadsNodeList = await page.$$(' span[name="ViewDailyUsage_RowSet_Row_column8"] ');;
// const endReadsArray = await Array.from(endReadsNodeList).map( item => parseFloat(item.innerText) );;

// const usagesNodeList = await page.$$(' span[name="ViewDailyUsage_RowSet_Row_column9"] ');;
// const usagesArray = await Array.from(usagesNodeList).map( item => parseFloat(item.innerText) );
// await console.log(settings.lassy);
// const energyUsage = await datesArray.map( (date, index) => (
//   {
//     'date': date,
//     'startRead': startReadsArray[index],
//     'endRead': endReadsArray[index],
//     'usage': usagesArray[index]
//   }
// ));

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







  // console.log( { 'scraperJson': '24' } );

  // return energyUsage;

  // return { 'test': 1,};

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
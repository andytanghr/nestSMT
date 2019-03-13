const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const moment = require('moment');

const nestScraper  = Promise.promisifyAll( require('../services/nestScraper') );
const HTMLParser = require('node-html-parser');


router.get('/', (req, res) => {

  let creds = {};
  creds.nestEmail = process.env.NESTEMAIL // ADD
  creds.nestPassword = process.env.NESTPASSWORD //

  nestScraper(creds)
  .then( content => {
    const bodyHTML = HTMLParser.parse(content);

    
    let usages = bodyHTML.querySelectorAll('.styles--timeCont_265');
        usages = Array.from(usages)
                      .map( item => item.innerHTML)
    // Array(10) [ "1¾ hr", "3 hr", "4 hr", "45 min", "2 hr", "4¼ hr", "3½ hr", "1¾ hr", "No usage", "30 min" ] // , "1¼ hr" ]
                      .map( i => i.replace('¼', '.25')
                                  .replace('½', '.5')
                                  .replace('¾', '.75')
                                  .replace(' hr', '')
                                  .replace('15', '.25')
                                  .replace('30', '.5')
                                  .replace('45', '.75')
                                  .replace(' min', '')
                                  .replace('No usage', 0) )
                      .map( i => parseFloat(i) );
    // Array(10) [ 3, 4, 0.75, 2, 4.25, 3.5, 1.75, 0, 0.5, 1.25 ]


    //heating or cooling

    
    let heatUsage = bodyHTML.querySelectorAll('.styles--heating_3kd');
        heatUsage = Array.from(heatUsage).map( (item, index) => item.attributes.style ? 
                                                       usages[index] * (parseFloat(item.attributes.style.slice(7)) / 100 ): 
                                                       0 );
        console.log(heatUsage);

    let coolUsage = bodyHTML.querySelectorAll('.styles--cooling_Hna');
        coolUsage = Array.from(coolUsage).map( (item, index) => item.attributes.style ? 
                                                       usages[index] * (parseFloat(item.attributes.style.slice(7)) / 100 ): 
                                                       0 );
        console.log(coolUsage);

/*
    let heatOrCool = bodyHTML.querySelectorAll('.styles--summaryPeriod_2v9'); // .attributes;
        heatOrCool = Array.from(heatOrCool).map( item => item.style );
    console.log(heatOrCool[0].width)
    ;

    let heatUsage = [];
    let coolUsage = [];

    heatOrCool.forEach( (item, index) => {
      item.replace('', 0);

      if (index % 2 === 0) {
        let idx = index / 2;
        heatUsage.push( parseFloat(item) / 100 * usages[ idx ] );
      } else {
        let idx = (index-1) / 2;
        coolUsage.push( parseFloat(item) / 100 * usages[ idx ] );
      }
    });
*/



    // if today is first reported date minus one, then generate array of that reported date counting back to 10 days todal
    // Array(10) [ "Sat 9", "Fri 8", "Thu 7", "Wed 6", "Tue 5", "Mon 4", "Sun 3", "Sat 2", "Fri 1", "Thu 28" ]
    let dates = bodyHTML.querySelectorAll('.styles--dayLabel_2Go');
        dates = Array.from(dates).map( item => item.innerHTML.slice(9, 11) );
    console.log('Nest always returns 10 dates prior: ' + dates.length);
    console.log(dates[0]);

    let nestYestday = parseInt(dates[0]);
    const getPastDate = daysPrevious =>  moment().subtract(daysPrevious, 'days');

    if ( nestYestday === getPastDate(1).get('date') ) {
      dates = dates.map( (item, index) => getPastDate(index+1) );
    }

    
        // let yesterday = new Date(); // today's yesterday...
           // yesterday.setDate( yesterday.getDate() - 1); // ...becomes yesterday yesterday



// let nestYestday = dates[0].match(/\d/g).join('')

    // Array [ "March", "February" ]
    // let months = document.querySelectorAll('.styles--monthHeader__vJ');
        // months = Array.from(months).map( i => i.innerHTML );









    let nestUsage10Days = dates.map( (date, index) => {
      return {
        'date': date,
        'heatUsage': heatUsage[index],
        'coolUsage': coolUsage[index]
      }
    });

    res.json(nestUsage10Days);

  })
  .catch( err => console.log(err) );


});


/**
// to get usage time
  let testNest = Array.from( document.querySelectorAll('.styles--timeCont_265') );
  // 
  testNest.map( i => i.innerHTML ); // Array(10) [ "3 hr", "4 hr", "45 min", "2 hr", "4¼ hr", "3½ hr", "1¾ hr", "No usage", "30 min", "1¼ hr" ]
  String.fromCharCode(188);
  "¼"
  String.fromCharCode(189);
  "½"
  String.fromCharCode(190);
  "¾"

  // to get usage dates
  let newDates = document.querySelectorAll('.styles--dayIcon_1CW');
  newDates = Array.from(newDates);
  newDates = newDates.map( i => i.previousSibling.data ); // Array(10) [ "Sat 9", "Fri 8", "Thu 7", "Wed 6", "Tue 5", "Mon 4", "Sun 3", "Sat 2", "Fri 1", "Thu 28" ]


  // to get months if any
  Array.from(document.querySelectorAll('.styles--monthHeader__vJ')).map( i => i.innerHTML );
  // Array [ "March", "February" ]
  // if return is [], then 

});
 */

module.exports = router;
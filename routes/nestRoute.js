const express = require('express');
const router = express.Router();
const Promise = require('bluebird');


const nestScraper  = Promise.promisifyAll( require('../services/nestScraper') );
// const HTMLParser = require('node-html-parser');
const { parseNestData } = require('../services/HTMLParser.js');


router.get('/', (req, res) => {

  let creds = {};
  creds.nestEmail = process.env.NESTEMAIL // 
  console.log(creds.nestEmail);

  creds.nestPassword = process.env.NESTPASSWORD //

  nestScraper(creds)
  .then( content => parseNestData(content) )
  .then ( results => res.json(results) )
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
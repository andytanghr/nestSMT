var express = require('express');
var router = express.Router();
const Promise = require('bluebird');

const scraper  = Promise.promisifyAll( require('../services/scraper') );
const HTMLParser = require('node-html-parser');

router.get('/', function(req, res) {

  let creds = {}; // req.creds;
    
  creds.startDate = '02/01/2019';
  creds.endDate = '02/31/2019';
  creds.username = process.env.USERNAME;
  creds.txtpassword = process.env.TXTPASSWORD;
  
  scraper(creds)
    .then( content => {
      let bodyHTML = HTMLParser.parse(content);

      let dates = bodyHTML.querySelectorAll('[name="ViewDailyUsage_RowSet_Row_column6"]');
          dates = Array.from(dates).map( item => item.innerHTML );
     
      let startReads = bodyHTML.querySelectorAll('[name="ViewDailyUsage_RowSet_Row_column7"]');
          startReads = Array.from(startReads).map( item => item.innerHTML );

      let endReads = bodyHTML.querySelectorAll('[name="ViewDailyUsage_RowSet_Row_column8"]');
          endReads = Array.from(endReads).map( item => item.innerHTML );

      let usages = bodyHTML.querySelectorAll('[name="ViewDailyUsage_RowSet_Row_column9"]');
          usages = Array.from(usages).map( item => item.innerHTML );

      const energyUsage =  dates.map( (date, index) => (
        {
          'date': date,
          'startRead': startReads[index],
          'endRead': endReads[index],
          'usage': usages[index]
        }
      ));

      return energyUsage;
      })

    .then( results => res.json( results ) )
    .catch( err => console.log(err) )
 
});

module.exports = router;

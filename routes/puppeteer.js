var express = require('express');
var router = express.Router();
// const scraper = require('../services/scraper');
const Promise = require('bluebird');
// import scraper from './utils/scraper';
const HTMLParser = require('node-html-parser');

const scraper  = Promise.promisifyAll( require('../services/scraper') );

router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  // scraper();
  // res.send(process.env.SECRET_KEY);
  req.creds = { 'lassy': 'passy' };
  let creds = req.creds;
    
  req.creds.startDate = '01/01/2019';
  req.creds.endDate = '01/31/2019';
  req.creds.username = process.env.USERNAME;
  req.creds.txtpassword = process.env.TXTPASSWORD;
  
//  console.log(req);
//   let scraperPromise = new Promise( (resolve, reject) => {
//     resolve ( scraper( req.creds ) )
//   })
// let scraperPromise = new Promise( (resolve, reject)  => {
//   resolve( console.log('promise works') )
// })

  // Promise.all[ scraper( req.creds ), console.log(scraper), res.json( )];

  // if (req.creds) {
  //   res.json( req.creds );
  // } else {
  //   res.send( 'scraper didn\'t send' );
  // }



  // console.log( scraper() );
  // res.send( scraper() );
  // Promise.all([
  //   scraper(),
  //   console.log('heyyyy in the console'),
  //   res.send('heyyyy')
  // ]);
  
  // let scraper2 = 
  // Promise.delay(10000, Promise.promisifyAll( scraper(creds) ) )
  
  scraper(creds)//.resolve()
  // Promise.all( scraper(creds) )
  // scraper(creds)
    .then( content => {
      let bodyHTML = HTMLParser.parse(content);
      // console.log( 'bodyHTML, where are you?');
      // console.log( bodyHTML.querySelector('title').innerHTML );
      // console.log( root.querySelectorAll('span[name="ViewDailyUsage_RowSet_Row_column6"]')[0].innerHTML );
      // return bodyHTML.querySelector('title').innerHTML;
      
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
    .then( console.log('before the results') )
    .then( results => res.json( results ) )
    .then( console.log('after the results') )
    // .catch( res.send('scraper failed') );



// let dataBack = scraper( creds );
// res.send(dataBack ? dataBack : {'yes':'we have no bananas'});
// res.send( energyData );






});

module.exports = router;

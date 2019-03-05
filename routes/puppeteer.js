var express = require('express');
var router = express.Router();
const scraper = require('../services/scraper');

// import scraper from './utils/scraper';


router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  // scraper();
  // res.send(process.env.SECRET_KEY);
  req.creds = { 'user': 'passy' };
  let creds = req.creds;
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

scraper(creds)
  .then( results => res.json( results ) )
  // .catch( res.send('scraper failed') );



// let dataBack = scraper( creds );
// res.send(dataBack ? dataBack : {'yes':'we have no bananas'});
// res.send( energyData );






});

module.exports = router;

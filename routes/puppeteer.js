var express = require('express');
var router = express.Router();
const scraper = require('../services/scraper');

// import scraper from './utils/scraper';


router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // scraper();
  // res.send(process.env.SECRET_KEY);
  
 
  
  Promise.all([
    scraper(),
    console.log('heyyyy in the console'),
    res.send('heyyyy')
  ]);
  
// promises for scraping, show on HTML, save to db

});

module.exports = router;

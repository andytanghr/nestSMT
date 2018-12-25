var express = require('express');
var router = express.Router();

var scraper = require('scraper')

/* go to Nest website */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  
  // res.send(process.env.SECRET_KEY);
  res.send('heyyyy');
  console.log('heyyy');

// promises for scraping, show on HTML, save to db

});

module.exports = router;

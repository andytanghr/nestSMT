var express = require('express');
var router = express.Router();
const Promise = require('bluebird');

const scraper  = Promise.promisifyAll( require('../services/smtScraper') );
// const {HTMLParser} = require('node-html-parser');
const { parseSMTData } = require('../services/HTMLParser');

router.get('/', function(req, res) {

  let creds = {}; // req.creds;
    
  creds.startDate = '02/01/2019';
  creds.endDate = '02/31/2019';
  creds.username = process.env.USERNAME;
  creds.txtpassword = process.env.TXTPASSWORD;
  
  scraper(creds)
    .then( content => parseSMTData(content) )
    .then( results => res.json( results ) )
    .catch( err => console.log(err) )
 
});

module.exports = router;

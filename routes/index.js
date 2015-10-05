var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index');
});

router.get('/feed', function(req, res, next) {
	request.get('https://basecamp.com/2707120/projects/10611786.atom', function(error, response, body){
		if(!error){
			//console.log(body);
			$ = cheerio.load(body);

			var entryArray = [];
			$('feed').filter(function(){

					entryArray.push({
						'date': $(this).children().eq(7).children().eq(5).text()
					});
	
			});


			res.json(entryArray);
		}
	}).auth('steve@marketing2marketers.com', 'dchampizhere2432', false);
});

module.exports = router;

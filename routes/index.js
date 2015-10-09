var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index');
});

router.get('/feed', function(req, res, next) {
var options = {
	url: 'https://basecamp.com/2707120/api/v1/events.json',
	headers: {
		'User-Agent': 'MyApp(steven@basecamp.com)'
	},
	auth:{
		user: 'steve@marketing2marketers.com',
		pass: 'dchampizhere2432'
	}
};

	request(options, function(error, message, html){
		if (!error) {
			console.log(html);
			res.json(html);
		};
	}).auth('steve@marketing2marketers.com', 'dchampizhere2432', false);

});

router.get('/projects', function(req, res, next) {
var options = {
	url: 'https://basecamp.com/2707120/api/v1/projects.json',
	headers: {
		'User-Agent': 'MyApp(steven@basecamp.com)'
	},
	auth:{
		user: 'steve@marketing2marketers.com',
		pass: 'dchampizhere2432'
	}
};

	request(options, function(error, message, html){
		if (!error) {
			//console.log(html);
			res.json(html);
		};
	}).auth('steve@marketing2marketers.com', 'dchampizhere2432', false);

});


router.get('/calendar', function(req, res, next) {
var options = {
	url: 'https://basecamp.com/2707120/api/v1/calendars/1444500/calendar_events.json',
	headers: {
		'User-Agent': 'MyApp(steven@basecamp.com)'
	},
	auth:{
		user: 'steve@marketing2marketers.com',
		pass: 'dchampizhere2432'
	}
};

	request(options, function(error, message, html){
		if (!error) {
			console.log(html);
			res.json(html);
		};
	}).auth('steve@marketing2marketers.com', 'dchampizhere2432', false);

});


router.get('/news', function(req, res, next) {
	request.get('http://marketing2marketers.curatasite.com/articles/featured/', function(error, response, body){
		if(!error){
			$ = cheerio.load(body);
			var newsArray = [];

			var lth = $('ol:nth-child(3)').children().length - 1;

			$('ol:nth-child(3)').filter(function(){
				for(var i = 0; i <= lth; i++){
					newsArray.push({
						'headline': $(this).children().eq(i).children().eq(0).children().eq(0).html().replace(/^\s+|\s+$|\s+(?=\s)/g, ''),
						'snippet': $(this).children().eq(i).children().eq(0).children().eq(2).children().eq(1).text().replace(/^\s+|\s+$|\s+(?=\s)/g, '')
					});	
						// this > ol - children > li(Array) - eq(0) > li[0] - children > article(Array) - eq(0) > article[0] - children > innerhtml article - eq(0) > h3 title
				}
			});

			//console.log(newsArray);
			res.json(newsArray); //newsArray sends all entry divs children
		}
	});
});


module.exports = router;
